import { PrismaClient, UserData } from '@prisma/client';
import { z } from 'zod';
import ProjectRepository from '@repositories/Project';
import { ReadableProjectData } from '@/types/project';
import prisma from '@/libs/prisma';

export default class UserDataRepository {
    constructor(private readonly prisma: PrismaClient['userData']) {}

    async create(userId: string) {
        z.string().cuid().parse(userId);

        return this.prisma.create({
            data: {
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        });
    }

    async getByUserId(userId: string): Promise<UserData> {
        z.string().cuid().parse(userId);

        return this.prisma.findFirstOrThrow({
            where: {
                user: {
                    id: userId
                }
            }
        });
    }

    async findProjectsByUserId(
        userId: string,
        include?: {
            items?: boolean;
            recipes?: boolean;
            activities?: boolean;
            categories?: boolean;
        }
    ): Promise<ReadableProjectData[]> {
        z.string().cuid().parse(userId);

        const repository = new ProjectRepository(prisma.project);
        const response = await this.prisma.findFirstOrThrow({
            where: {
                id: userId
            },
            include: {
                project: {
                    include: {
                        project: {
                            include: {
                                users: {
                                    select: {
                                        role: true,
                                        userId: true,
                                        isInvited: true,
                                        createdAt: true,
                                        isSelected: true
                                    }
                                },
                                recipes: include?.recipes ?? false,
                                activities: include?.activities ?? false,
                                categories: include?.categories ?? false
                            }
                        }
                    }
                }
            }
        });

        return repository.projectsToReadable(
            response.project.map((p) => p.project),
            userId
        );
    }
}
