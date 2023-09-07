import { z } from 'zod';
import { ActivityType, Category, Item, PrismaClient } from '@prisma/client';
import { removeNamespace } from '@/libs/utils';
import { ReadableItemData } from '@/types/minecraft';
import RecipeRepository from '@repositories/Recipe';
import CategoryRepository from '@repositories/Category';
import { createActivity } from '@repositories/ActivityRepository';
import prisma from '@/libs/prisma';
import ProjectRepository from '@repositories/Project';

export type ItemWithCategories = Item & { categories?: Category[] };

export type CreateItemModel = z.infer<typeof CreateItemModel>;
export const CreateItemModel = z.object({
    minecraftId: z.string().min(1).max(80),
    name: z.string().min(1).max(80),
    custom: z.boolean(),
    tag: z.string().optional(),
    categories: z.array(z.string()).optional()
});

export type UpdateItemModel = z.infer<typeof UpdateItemModel>;
export const UpdateItemModel = z.object({
    minecraftId: z.string().min(1).max(80).optional(),
    name: z.string().min(1).max(80).optional(),
    custom: z.boolean().optional(),
    tag: z.string().optional(),
    categories: z.array(z.string()).optional()
});

export default class ItemRepository {
    constructor(private readonly prisma: PrismaClient['item']) {}

    async findAll(categories?: boolean, custom?: boolean) {
        const items = await this.prisma.findMany({
            include: { categories: categories },
            where: { custom: custom }
        });

        return this.itemsToReadable(items);
    }

    /**
     * Finds items by minecraft category ID, e.g. minecraft:building_blocks.
     *
     * @param {string} categoryId - The category ID to search for.
     * @returns {Promise<ReadableItemData[]>} - A promise that resolves to an array of formatted minecraft items.
     */
    async findByCategory(categoryId: string): Promise<ReadableItemData[]> {
        z.string().startsWith('minecraft:').parse(categoryId);

        const items = await this.prisma.findMany({
            where: {
                categories: {
                    some: {
                        categoryId
                    }
                }
            },
            include: {
                categories: true
            }
        });

        return this.itemsToReadable(items);
    }

    async findByProject(projectId: string, userId: string): Promise<ReadableItemData[]> {
        z.string().cuid().parse(projectId);
        z.string().cuid().parse(userId);

        const hasPermission = await new ProjectRepository(prisma.project).checkIfUserIsInProject(projectId, userId);
        if (!hasPermission) throw new Error('You are not allowed to get this project');

        const items = await this.prisma.findMany({
            where: {
                projectId
            },
            include: {
                categories: true
            }
        });

        return this.itemsToReadable(items);
    }

    async checkIfItemExists(projectId: string, itemId: string) {
        z.object({
            projectId: z.string().cuid(),
            itemId: z.string().cuid()
        }).parse({ projectId, itemId });

        const item = await this.prisma.findUniqueOrThrow({
            where: {
                id: itemId
            }
        });

        return item?.projectId === projectId;
    }

    async count() {
        return this.prisma.count();
    }

    async create(projectId: string, userId: string, data: CreateItemModel) {
        z.object({
            projectId: z.string().cuid(),
            userId: z.string().cuid()
        }).parse({ projectId, userId });
        CreateItemModel.parse(data);

        createActivity(projectId, userId, '%user% created the recipe ' + data.name, ActivityType.CREATE);
        return this.prisma.create({
            data: {
                ...data,
                categories: {
                    connect: data.categories?.map((id) => {
                        return { id };
                    })
                },
                project: {
                    connect: {
                        id: projectId
                    }
                }
            }
        });
    }

    async update(projectId: string, userId: string, itemId: string, data: UpdateItemModel) {
        z.object({
            projectId: z.string().cuid(),
            userId: z.string().cuid(),
            itemId: z.string().cuid()
        }).parse({ projectId, userId, itemId });

        UpdateItemModel.parse(data);
        createActivity(projectId, userId, '%user% updated the item ' + data.name, ActivityType.INFO);
        return this.prisma.update({
            where: {
                id: itemId
            },
            data: {
                ...data,
                categories: {
                    set: data.categories?.map((id) => {
                        return { id };
                    })
                }
            }
        });
    }

    async delete(projectId: string, userId: string, itemId: string) {
        z.object({
            projectId: z.string().cuid(),
            userId: z.string().cuid(),
            itemId: z.string().cuid()
        }).parse({ projectId, userId, itemId });

        const recipeRepository = new RecipeRepository(prisma.recipes);
        const recipes = await recipeRepository.findByItem(itemId, userId);

        if (recipes.length > 0) {
            await recipeRepository.deleteByItem(itemId);
        }

        const response = await this.prisma.delete({
            where: {
                id: itemId
            }
        });

        createActivity(projectId, userId, '%user% deleted the item ' + response.name, ActivityType.DELETE);
        return response;
    }

    itemsToReadable(items: ItemWithCategories[]): ReadableItemData[] {
        return items.map((item) => this.itemToReadable(item));
    }

    itemToReadable(item: ItemWithCategories): ReadableItemData {
        const asset = item.custom
            ? `${process.env.ASSET_PREFIX}/project/${item.projectId}/item/${item.id}.webp`
            : `${process.env.ASSET_PREFIX}/minecraft/items/${removeNamespace(item.minecraftId)}.webp`;

        const atlasPosition: Position2D | undefined =
            item.assetY !== null && item.assetX !== null ? { x: item.assetX, y: item.assetY } : undefined;

        return {
            id: item.id,
            minecraftId: item.minecraftId,
            name: item.name,
            asset: asset,
            position: atlasPosition,
            custom: item.custom,
            tag: item.tag,
            categories: new CategoryRepository(prisma.category).categoriesToReadable(item?.categories ?? [])
        };
    }
}
