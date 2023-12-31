import { RequiredBy } from '@/types/global';
import { Activity, ActivityType, Category, Item, PrismaClient, Project, ProjectRole, ProjectUser, Recipes, UserData } from '@prisma/client';
import { User } from 'next-auth';
import { z } from 'zod';
import ActivityRepository, { createActivity } from './ActivityRepository';
import ItemRepository from '@repositories/Items';
import RecipeRepository from '@repositories/Recipe';
import CategoryRepository from '@repositories/Category';
import type { ReadableMemberData, ReadableProjectData } from '@/types/project';
import prisma from '@/libs/prisma';
import uploadAsset from '@/libs/aws/upload';

type MemberData = RequiredBy<Partial<ProjectUser>, 'role' | 'createdAt' | 'userId'> & {
    userData?: Partial<UserData> & { user: User | null };
};

export type ProjectData = Project & {
    categories?: Category[];
    items?: Item[];
    recipes?: Recipes[];
    activities?: (Activity & { createdBy?: User })[];
    users?: MemberData[];
};

export type CreateProjectModel = z.infer<typeof CreateProjectModel>;
export const CreateProjectModel = z.object({
    name: z.string().min(1).max(50),
    description: z.string().min(1).max(255),
    version: z.string().min(1).max(10),
    namespace: z.string().min(1).max(50),
    asset: z.any()
});

export type UpdateProjectModel = z.infer<typeof UpdateProjectModel>;
export const UpdateProjectModel = z.object({
    name: z.string().min(1).max(50).optional(),
    description: z.string().min(1).max(255).optional(),
    version: z.string().min(1).max(10).optional(),
    namespace: z.string().min(1).max(50).optional()
});

export default class ProjectRepository {
    constructor(private readonly prisma: PrismaClient['project']) {}

    /**
     * Get project by id.
     * @param projectId
     * @param userId
     * @param include
     */
    async findOne(projectId: string, userId: string, include?: boolean): Promise<ReadableProjectData> {
        z.string().cuid().parse(projectId);
        z.string().cuid().parse(userId);

        const hasPermission = await this.checkIfUserIsInProject(projectId, userId);
        if (!hasPermission) throw new Error('You are not allowed to get this project');

        const responses = await this.prisma.findUniqueOrThrow({
            where: { id: projectId },
            include: {
                items: include,
                recipes: include,
                users: include,
                activities: {
                    include: {
                        createdBy: include
                    }
                },
                categories: include
            }
        });

        return this.projectToReadable(responses);
    }

    async findByRecipeId(recipeId: string, userId: string): Promise<string> {
        z.string().cuid().parse(recipeId);
        z.string().cuid().parse(userId);

        const response = await this.prisma.findFirst({
            where: {
                recipes: {
                    some: {
                        id: recipeId
                    }
                },
                users: {
                    some: {
                        userId
                    }
                }
            },
            select: {
                id: true
            }
        });

        if (!response) throw new Error('An error occurred while getting the project');
        return response.id;
    }

    async findByItemId(itemId: string, userId: string): Promise<string> {
        z.string().cuid().parse(itemId);
        z.string().cuid().parse(userId);

        const response = await this.prisma.findFirst({
            where: {
                items: {
                    some: {
                        id: itemId
                    }
                },
                users: {
                    some: {
                        userId
                    }
                }
            },
            select: {
                id: true
            }
        });

        if (!response) throw new Error('An error occurred while getting the project');
        return response.id;
    }

    /**
     * Update the selected project of a user.
     * @param projectId
     * @param userId
     */
    async selectProject(projectId: string, userId: string): Promise<ReadableProjectData> {
        z.object({
            projectId: z.string().cuid(),
            userId: z.string().cuid()
        }).parse({ projectId, userId });

        await prisma.projectUser.updateMany({
            where: {
                userId
            },
            data: {
                isSelected: false
            }
        });

        await prisma.projectUser.update({
            where: {
                projectId_userId: {
                    projectId,
                    userId
                }
            },
            data: {
                isSelected: true
            }
        });

        const response = await this.prisma.findUniqueOrThrow({
            where: {
                id: projectId
            }
        });

        return this.projectToReadable(response);
    }

    /**
     * This function is used to store project data in the authentication session.
     * @param userId
     */
    async sessionProject(userId: string): Promise<ReadableProjectData | null> {
        z.string().cuid().parse(userId);

        const response = await this.prisma.findFirst({
            where: {
                users: {
                    some: {
                        userId,
                        isSelected: true
                    }
                }
            },
            include: {
                users: {
                    select: {
                        userId: true,
                        role: true,
                        createdAt: true,
                        isInvited: true,
                        userData: {
                            select: {
                                user: true
                            }
                        }
                    }
                }
            }
        });

        if (!response) return null;

        return this.projectToReadable(response, userId);
    }

    /**
     * Return the number of projects of a user.
     * @param userId
     */
    async countByUser(userId: string) {
        z.string().cuid().parse(userId);

        return this.prisma.count({
            where: {
                users: {
                    some: {
                        userId
                    }
                }
            }
        });
    }

    /**
     * Create a new project.
     * Limitation: 10 projects per user.
     * @param userId
     * @param data
     */
    async create(userId: string, data: CreateProjectModel): Promise<ReadableProjectData> {
        z.string().cuid().parse(userId);
        CreateProjectModel.parse(data);

        const user = await this.countByUser(userId);
        if (user >= 10) throw new Error('You can only have 10 projects at a time');

        const project = await this.prisma.create({
            data: {
                ...data,
                asset: '',
                users: {
                    create: {
                        role: 'OWNER',
                        userId
                    }
                }
            }
        });

        const projectId = project.id;
        const filename = 'icons';
        const destination = `project/${projectId}/${filename}.webp`;
        await this.prisma.update({
            where: {
                id: projectId
            },
            data: {
                asset: destination
            }
        });

        await uploadAsset(`project/${projectId}`, data.asset, { width: 64, height: 64, filename: filename });
        createActivity(projectId, userId, '%user% created the project %project%', ActivityType.CREATE);
        return this.projectToReadable({ ...project, asset: destination });
    }

    /**
     * Update project data by project id, and user id.
     * If the user is owner or admin of the project, he can update all data.
     * In the field "Data" you can indicate one or more fields. All fields can be "undefined" for example.
     * @param projectId
     * @param userId
     * @param data
     */
    async update(projectId: string, userId: string, data: UpdateProjectModel): Promise<ReadableProjectData> {
        z.object({
            projectId: z.string().cuid(),
            userId: z.string().cuid()
        }).parse({ projectId, userId });
        UpdateProjectModel.parse(data);

        const hasPermission = await this.hasPermission(projectId, userId, [ProjectRole.ADMIN, ProjectRole.OWNER]);
        if (!hasPermission) throw new Error('You are not allowed to update this project');

        const response = await this.prisma.update({
            where: {
                id: projectId
            },
            data
        });

        createActivity(projectId, userId, '%user% updated the project');
        return this.projectToReadable(response);
    }

    async updateAsset(projectId: string, userId: string, asset: File) {
        z.object({
            projectId: z.string().cuid(),
            userId: z.string().cuid()
        }).parse({ projectId, userId });

        const hasPermission = await this.hasPermission(projectId, userId, [ProjectRole.ADMIN, ProjectRole.OWNER]);
        if (!hasPermission) throw new Error('You are not allowed to update this project');

        await uploadAsset(`project/${projectId}`, asset, { width: 64, height: 64, filename: 'icons' });
        createActivity(projectId, userId, '%user% updated the project asset', ActivityType.INFO);
    }

    /**
     * Delete project by project id, and user id.
     * Only the owner of the project can delete it.
     * @param projectId
     * @param userId
     */
    async delete(projectId: string, userId: string): Promise<ReadableProjectData> {
        z.object({
            projectId: z.string().cuid(),
            userId: z.string().cuid()
        }).parse({ projectId, userId });

        const hasPermission = await this.hasPermission(projectId, userId, [ProjectRole.ADMIN, ProjectRole.OWNER]);
        if (!hasPermission) throw new Error('You are not allowed to delete this project');

        const response = await this.prisma.delete({
            where: {
                id: projectId
            }
        });

        return this.projectToReadable(response);
    }

    /**
     * This function allows you to check if the user's role in the database is contained in the
     * @param projectId
     * @param userId
     * @param role
     */
    async hasPermission(projectId: string, userId: string, role: ProjectRole[]): Promise<boolean> {
        z.object({
            projectId: z.string().cuid(),
            userId: z.string().cuid()
        }).parse({ projectId, userId });
        role.forEach((r) => z.nativeEnum(ProjectRole).parse(r));

        const project = await this.prisma.findUniqueOrThrow({
            where: {
                id: projectId
            },
            include: {
                users: true
            }
        });

        return project.users.some((user) => user.userId === userId && role.includes(user.role as ProjectRole));
    }

    /**
     * Verify if the user is in the project.
     * @param projectId
     * @param userId
     */
    async checkIfUserIsInProject(projectId: string, userId: string): Promise<boolean> {
        z.object({
            projectId: z.string().cuid(),
            userId: z.string().cuid()
        }).parse({ projectId, userId });

        const project = await this.prisma.findUniqueOrThrow({
            where: {
                id: projectId
            },
            include: {
                users: true
            }
        });

        return project.users.some((user) => user.userId === userId);
    }

    /**
     * Add a user to a project, this user will then have an invitation that he will have to validate.
     * @param projectId
     * @param RequestUserId
     * @param email
     */
    async inviteUser(projectId: string, RequestUserId: string, email: string): Promise<ReadableProjectData> {
        z.object({
            projectId: z.string().cuid(),
            RequestUserId: z.string().cuid(),
            email: z.string().email()
        }).parse({ projectId, RequestUserId, email });

        const hasPermission = await this.hasPermission(projectId, RequestUserId, [ProjectRole.ADMIN, ProjectRole.OWNER]);
        if (!hasPermission) throw new Error('You are not allowed to invite users to this project');

        const user = await prisma.userData.findFirstOrThrow({
            where: {
                user: {
                    email
                }
            },
            select: {
                id: true,
                user: {
                    select: {
                        name: true
                    }
                }
            }
        });

        const response = await this.prisma.update({
            where: {
                id: projectId
            },
            data: {
                users: {
                    create: {
                        userId: user.id,
                        isInvited: true,
                        role: ProjectRole.USER
                    }
                }
            }
        });

        createActivity(RequestUserId, projectId, '%user% has invited a new member to the project, welcome ' + user.user?.name);
        return this.projectToReadable(response);
    }

    /**
     * This function allows you to accept an invitation to a project.
     * @param projectId
     * @param userId
     */
    async acceptInvite(projectId: string, userId: string): Promise<ReadableProjectData> {
        z.object({
            projectId: z.string().cuid(),
            userId: z.string().cuid()
        }).parse({ projectId, userId });

        const response = await this.prisma.update({
            where: {
                id: projectId
            },
            data: {
                users: {
                    update: {
                        where: {
                            projectId_userId: {
                                projectId,
                                userId
                            }
                        },
                        data: {
                            isInvited: false
                        }
                    }
                }
            }
        });

        createActivity(projectId, userId, '%user% has accepted the invitation', ActivityType.CREATE);
        return this.projectToReadable(response);
    }

    /**
     * This function is used for leaving a project, not usable by owners
     * @param projectId
     * @param userId
     */
    async leaveProject(projectId: string, userId: string) {
        z.object({
            projectId: z.string().cuid(),
            userId: z.string().cuid()
        }).parse({ projectId, userId });

        await prisma.projectUser.delete({
            where: {
                projectId_userId: {
                    projectId,
                    userId
                }
            }
        });

        createActivity(projectId, userId, '%user% has left the project', ActivityType.DELETE);
    }

    async denyProject(projectId: string, userId: string): Promise<ReadableProjectData> {
        z.object({
            projectId: z.string().cuid(),
            userId: z.string().cuid()
        }).parse({ projectId, userId });

        const response = await this.prisma.update({
            where: {
                id: projectId,
                users: {
                    some: {
                        userId,
                        isInvited: true
                    }
                }
            },
            data: {
                users: {
                    delete: {
                        projectId_userId: {
                            projectId,
                            userId
                        }
                    }
                }
            }
        });

        createActivity(projectId, userId, '%user% has denied the invitation', ActivityType.DELETE);
        return this.projectToReadable(response);
    }

    /**
     * Basically kicks a user from a project
     * @param projectId
     * @param RequestUserId
     * @param RemovedUserId
     */
    async removeUserInProject(projectId: string, RequestUserId: string, RemovedUserId: string): Promise<ReadableProjectData> {
        z.object({
            projectId: z.string().cuid(),
            RequestUserId: z.string().cuid(),
            RemovedUserId: z.string().cuid()
        }).parse({ projectId, RequestUserId, RemovedUserId });

        const hasPermission = await this.hasPermission(projectId, RequestUserId, [ProjectRole.ADMIN, ProjectRole.OWNER]);
        if (!hasPermission) throw new Error('You are not allowed to remove users from this project');

        const response = await this.prisma.update({
            where: {
                id: projectId
            },
            data: {
                users: {
                    delete: {
                        projectId_userId: {
                            projectId,
                            userId: RemovedUserId
                        }
                    }
                }
            }
        });

        createActivity(RequestUserId, projectId, '%user% has kicked a member from the project, bye bye', ActivityType.DELETE);
        return this.projectToReadable(response);
    }

    /**
     * Give to another user the ownership of the project, the actual owner will be demoted to admin
     * @param projectId
     * @param userId
     * @param email
     */
    async transferOwnership(projectId: string, userId: string, email: string) {
        z.object({
            projectId: z.string().cuid(),
            userId: z.string().cuid(),
            email: z.string().email()
        }).parse({ projectId, userId, email });

        const user = await prisma.userData.findFirstOrThrow({
            where: {
                user: {
                    email
                }
            },
            select: {
                id: true,
                user: {
                    select: {
                        name: true
                    }
                }
            }
        });

        const hasPermission = await this.hasPermission(projectId, userId, [ProjectRole.OWNER]);
        if (!hasPermission) throw new Error('You are not allowed to transfer ownership of this project');
        if (userId === user.id) throw new Error('You are not allowed to change your own role');

        await prisma.projectUser.update({
            where: {
                projectId_userId: {
                    projectId,
                    userId
                }
            },
            data: {
                role: ProjectRole.ADMIN
            }
        });

        await prisma.projectUser.update({
            where: {
                projectId_userId: {
                    projectId,
                    userId: user.id
                }
            },
            data: {
                role: ProjectRole.OWNER
            }
        });

        createActivity(projectId, userId, '%user% has transferred the ownership of the project to ' + user.user?.name);
    }

    /**
     * Change the role of a user in a project, only the owner can do this.
     * The owner can't change his own role.
     * @param projectId
     * @param requestUserId
     * @param userId
     * @param role
     */
    async updateUserRole(projectId: string, requestUserId: string, userId: string, role: ProjectRole): Promise<ReadableProjectData> {
        z.object({
            projectId: z.string().cuid(),
            requestUserId: z.string().cuid(),
            userId: z.string().cuid(),
            role: z.nativeEnum(ProjectRole)
        }).parse({ projectId, requestUserId, userId, role });

        const hasPermission = await this.hasPermission(projectId, requestUserId, [ProjectRole.OWNER]);
        if (!hasPermission) throw new Error('You are not allowed to change roles in this project');
        if (role === ProjectRole.OWNER) throw new Error('You are not allowed to change the role of the owner');
        if (requestUserId === userId) throw new Error('You are not allowed to change your own role');

        const response = await this.prisma.update({
            where: {
                id: projectId
            },
            data: {
                users: {
                    update: {
                        where: {
                            projectId_userId: {
                                projectId,
                                userId
                            }
                        },
                        data: {
                            role
                        }
                    }
                }
            }
        });

        createActivity(requestUserId, projectId, '%user% has changed the role of a member to ' + role);
        return this.projectToReadable(response);
    }

    /**
     * Get all members of a project, including the role, email, name, asset, id, if the user is invited and if the user is the owner
     * @param projectId
     * @param userId
     * @return {Promise<ReadableProjectData>}
     */
    async getMembersData(projectId: string, userId: string): Promise<ReadableProjectData> {
        z.string().cuid().parse(userId);
        z.string().cuid().parse(projectId);

        const hasPermission = await this.checkIfUserIsInProject(projectId, userId);
        if (!hasPermission) throw new Error('You are not allowed to get users from this project');

        const project = await this.prisma.findUniqueOrThrow({
            where: {
                id: projectId
            },
            include: {
                users: {
                    include: {
                        userData: {
                            include: {
                                user: true
                            }
                        }
                    }
                }
            }
        });

        return this.projectToReadable(project);
    }

    membersToReadable(members: MemberData[]): ReadableMemberData[] {
        return members.map((member) => this.memberToReadable(member));
    }

    /**
     * Transforms "ProjectUser" to readable data usable by the client
     * @param memberData
     */
    memberToReadable(memberData: MemberData): ReadableMemberData {
        return {
            role: memberData.role as ProjectRole,
            joinedAt: memberData.createdAt.getTime(),
            userId: memberData.userId,
            isInvited: memberData?.isInvited,
            isSelected: memberData?.isSelected,
            accountData: memberData.userData && {
                name: memberData?.userData?.user?.name ?? 'No name',
                email: memberData?.userData?.user?.email ?? 'No email',
                avatar: memberData?.userData?.user?.image ?? `${process.env.ASSET_PREFIX}/assets/default_avatar.webp`
            }
        };
    }

    projectsToReadable(projects: ProjectData[], userId?: string): ReadableProjectData[] {
        return projects.map((project) => this.projectToReadable(project, userId));
    }

    /**
     * Transforms "Project" to readable data usable by the client
     * Include a full and correct asset url
     * And also include correct Item data using MinecraftItemData type.
     * @param project
     * @param userId
     */
    projectToReadable(project: ProjectData, userId?: string): ReadableProjectData {
        const selectedUser = project?.users?.find((user) => user.userId === userId);

        return {
            ...project,
            createdAt: project.createdAt.getTime(),
            updatedAt: project.updatedAt?.getTime(),
            asset: `${process.env.ASSET_PREFIX}/${project.asset}`,
            items: new ItemRepository(prisma.item).itemsToReadable(project?.items ?? []),
            recipes: new RecipeRepository(prisma.recipes).recipesToReadable(project?.recipes ?? []),
            activities: new ActivityRepository(prisma.activity).activitiesToReadable(project?.activities ?? []),
            categories: new CategoryRepository(prisma.category).categoriesToReadable(project?.categories ?? []),
            users: this.membersToReadable(project?.users ?? []),
            session: {
                role: selectedUser?.role,
                isOwner: selectedUser && selectedUser?.role === ProjectRole.OWNER,
                isInvited: selectedUser?.isInvited,
                isSelected: selectedUser?.isSelected
            }
        };
    }
}
