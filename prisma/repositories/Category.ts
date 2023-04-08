import { ActivityType, Category, Item, PrismaClient } from '@prisma/client';
import { ReadableCategoryData } from '@definitions/minecraft';
import ItemRepository from '@repositories/Items';
import { z } from 'zod';
import prisma from '@libs/prisma';
import { createActivity } from '@repositories/ActivityRepository';

type CategoryWithItems = Category & { items?: Item[] };

export type CreateCategoryModel = z.infer<typeof CreateCategoryModel>;
export const CreateCategoryModel = z.object({
    categoryId: z.string().min(1).max(70),
    minecraftId: z.string().min(1).max(80),
    name: z.string().min(1).max(30),
    custom: z.boolean()?.optional()
});

export type UpdateCategoryModel = z.infer<typeof UpdateCategoryModel>;
export const UpdateCategoryModel = z.object({
    categoryId: z.string().min(1).max(70).optional(),
    minecraftId: z.string().min(1).max(80).optional(),
    name: z.string().min(1).max(30).optional(),
    custom: z.boolean().optional()
});

export default class CategoryRepository {
    constructor(private readonly prisma: PrismaClient['category']) {}

    async findAll(items?: boolean, custom?: boolean) {
        return this.prisma.findMany({
            include: { items: items },
            where: { custom: custom }
        });
    }

    async connectItem(categoryId: string, itemId: string) {
        z.string().cuid().parse(categoryId);

        return this.prisma.update({
            where: {
                id: categoryId
            },
            data: {
                items: {
                    connect: {
                        id: itemId
                    }
                }
            }
        });
    }

    async getCategoryListItems() {
        const data = await prisma.category.findMany({
            select: {
                items: {
                    select: {
                        minecraftId: true
                    }
                },
                categoryId: true
            }
        });

        return data.map((category) => {
            return {
                category: category.categoryId,
                items: category.items.map((item) => item.minecraftId)
            };
        });
    }

    async connectCustomItemToCategory(userId: string, projectId: string, categoryId: string, itemId: string) {
        z.object({
            userId: z.string().cuid(),
            projectId: z.string().cuid(),
            categoryId: z.string().cuid()
        }).parse({ userId, projectId, categoryId });

        const item = await prisma.item.findFirstOrThrow({
            where: {
                id: itemId,
                projectId: projectId
            }
        });

        await this.prisma.findFirstOrThrow({
            where: {
                id: categoryId
            }
        });

        createActivity(userId, projectId, '%user% connected the item ' + item.name + ' to the category ' + categoryId, ActivityType.CREATE);
        return this.prisma.update({
            where: {
                id: categoryId
            },
            data: {
                items: {
                    connect: {
                        id: itemId
                    }
                }
            }
        });
    }

    async findVanilla(): Promise<ReadableCategoryData[]> {
        const categories = await this.prisma.findMany({
            include: {
                items: {
                    where: {
                        custom: false
                    }
                }
            },
            where: {
                custom: false
            }
        });

        return this.categoriesToReadable(categories);
    }

    async findByProject(projectId: string, items: boolean = true) {
        z.string().cuid().parse(projectId);

        const response = await this.prisma.findMany({
            where: {
                OR: [
                    {
                        projectId
                    },
                    {
                        custom: false
                    }
                ]
            },
            include: {
                items: items
            }
        });

        return this.categoriesToReadable(response);
    }

    async count() {
        return this.prisma.count();
    }

    async create(userId: string, projectId: string, data: CreateCategoryModel) {
        z.object({
            userId: z.string().cuid(),
            projectId: z.string().cuid()
        }).parse({ userId, projectId });

        CreateCategoryModel.parse(data);

        const itemId = data.minecraftId;
        if (!itemId) throw new Error('Missing minecraftId');
        const assetUrl = (itemId.startsWith('minecraft:') ? itemId.replace('minecraft:', '') : itemId) + '.webp';

        createActivity(userId, projectId, '%user% created the category ' + data.name, ActivityType.CREATE);
        return this.prisma.create({
            data: {
                ...data,
                asset: assetUrl
            }
        });
    }

    async update(userId: string, projectId: string, categoryId: string, data: Partial<UpdateCategoryModel>) {
        z.object({
            userId: z.string().cuid(),
            projectId: z.string().cuid(),
            categoryId: z.string().cuid()
        }).parse({ userId, projectId, categoryId });

        UpdateCategoryModel.parse(data);

        const itemId = data.minecraftId;
        if (!itemId) throw new Error('Missing minecraftId');
        const assetUrl = (itemId.startsWith('minecraft:') ? itemId.replace('minecraft:', '') : itemId) + '.webp';

        createActivity(userId, projectId, '%user% update the category ' + data.name, ActivityType.INFO);
        return this.prisma.update({
            where: {
                id: categoryId
            },
            data: {
                ...data,
                asset: assetUrl
            }
        });
    }

    async delete(userId: string, projectId: string, categoryId: string) {
        z.object({
            userId: z.string().cuid(),
            projectId: z.string().cuid(),
            categoryId: z.string().cuid()
        }).parse({ userId, projectId, categoryId });

        const data = await this.prisma.delete({
            where: {
                id: categoryId
            }
        });

        createActivity(userId, projectId, '%user% deleted the category ' + data.name, ActivityType.DELETE);
        return data;
    }

    categoriesToReadable(categories: CategoryWithItems[]): ReadableCategoryData[] {
        return categories.map((category) => this.categoryToReadable(category));
    }

    categoryToReadable(category: CategoryWithItems): ReadableCategoryData {
        return {
            id: category.id,
            name: category.name,
            categoryId: category.categoryId,
            asset: `${process.env.ASSET_PREFIX}/minecraft/items/${category.asset}`,
            items: new ItemRepository(prisma.item).itemsToReadable(category?.items ?? [])
        };
    }
}
