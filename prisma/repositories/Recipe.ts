import { z } from 'zod';
import prisma from '@/libs/prisma';
import { ActivityType, Ingredient, Item, PrismaClient, Recipes, RecipeType } from '@prisma/client';
import { ReadableRecipeData, SlotData } from '@/types/minecraft';
import ItemRepository from '@repositories/Items';
import { createActivity } from '@repositories/ActivityRepository';

type CreateIngredientData = { slot: string; count: number; itemId: string };
type RecipeData = Recipes & {
    ingredients?: (Ingredient & { item: Item })[];
};

export type CreateRecipeModel = z.infer<typeof CreateRecipeModel>;
export const CreateRecipeModel = z.object({
    name: z.string().min(1).max(50),
    type: z.nativeEnum(RecipeType),
    custom: z.boolean(),
    ingredients: z.array(
        z.object({
            slot: z.string().min(1).max(50),
            count: z.number().min(1).max(64).optional(),
            item: z.any()
        })
    )
});

export type UpdateRecipeModel = z.infer<typeof UpdateRecipeModel>;
export const UpdateRecipeModel = z.object({
    name: z.string().min(1).max(50).optional(),
    type: z.nativeEnum(RecipeType).optional(),
    custom: z.boolean().optional(),
    ingredients: z.array(
        z.object({
            slot: z.string().min(1).max(50),
            count: z.number().min(1).max(64).optional(),
            item: z.any()
        })
    )
});

export default class RecipeRepository {
    constructor(private readonly prisma: PrismaClient['recipes']) {}

    /**
     * Get the recipe by its id
     * @param id
     */
    async findOne(id: string) {
        z.string().cuid().parse(id);

        const response = await this.prisma.findUniqueOrThrow({
            where: {
                id
            },
            include: {
                ingredients: {
                    include: {
                        item: true
                    }
                }
            }
        });

        return this.recipeToReadable(response);
    }

    /**
     * Get all recipes by project id
     * @param projectId
     */
    async findByProject(projectId: string) {
        z.string().cuid().parse(projectId);

        const response = await this.prisma.findMany({
            where: {
                projectId
            },
            include: {
                ingredients: {
                    include: {
                        item: true
                    }
                }
            }
        });

        return this.recipesToReadable(response);
    }

    async findByItem(itemId: string) {
        z.string().cuid().parse(itemId);

        const response = await this.prisma.findMany({
            where: {
                ingredients: {
                    some: {
                        itemId
                    }
                }
            }
        });

        return this.recipesToReadable(response);
    }

    /**
     * Create a new recipe
     */
    async create(userId: string, projectId: string, recipe: CreateRecipeModel) {
        z.object({
            userId: z.string().cuid(),
            projectId: z.string().cuid()
        }).parse({ userId, projectId });
        CreateRecipeModel.parse(recipe);

        const recipes = await this.findByProject(projectId);
        const recipeExists = recipes.some((r) => {
            return r.ingredients.every((i) => recipe.ingredients.some((ri) => ri.slot === i.slot && ri.item.id === i.item.id));
        });

        if (recipeExists) {
            throw new Error('Recipe already exists');
        }

        const response = await this.prisma.create({
            data: {
                projectId: projectId,
                name: recipe.name,
                type: recipe.type,
                custom: recipe.custom,
                ingredients: {
                    create: this.slotDataToIngredient(recipe.ingredients)
                }
            },
            include: {
                ingredients: {
                    include: {
                        item: true
                    }
                }
            }
        });

        createActivity(userId, projectId, '%user% created the recipe ' + response.name, ActivityType.CREATE);
        return this.recipeToReadable(response);
    }

    async update(userId: string, projectId: string, recipeId: string, data: UpdateRecipeModel) {
        z.object({
            userId: z.string().cuid(),
            projectId: z.string().cuid(),
            recipeId: z.string().cuid()
        }).parse({ userId, projectId, recipeId });
        UpdateRecipeModel.parse(data);

        const ingredients = this.slotDataToIngredient(data.ingredients);
        const response = await this.prisma.update({
            where: {
                id: recipeId
            },
            data: {
                type: data.type,
                custom: data.custom,
                name: data.name
            },
            include: {
                ingredients: {
                    include: {
                        item: true
                    }
                }
            }
        });

        await prisma.ingredient.deleteMany({
            where: {
                recipeId
            }
        });

        await prisma.ingredient.createMany({
            data: ingredients.map((ingredient) => ({
                ...ingredient,
                recipeId
            }))
        });

        createActivity(userId, projectId, '%user% updated the recipe ' + response.name, ActivityType.INFO);
        return this.recipeToReadable(response);
    }

    async delete(userId: string, projectId: string, id: string) {
        z.object({
            userId: z.string().cuid(),
            projectId: z.string().cuid(),
            id: z.string().cuid()
        }).parse({ userId, projectId, id });

        const response = await this.prisma.delete({
            where: {
                id
            },
            select: {
                name: true
            }
        });

        createActivity(userId, projectId, '%user% deleted the recipe ' + response.name, ActivityType.DELETE);
        return response;
    }

    async deleteByItem(itemId: string) {
        z.string().cuid().parse(itemId);

        // Delete all recipes that contain the item
        // But i don't know why, but it deletes only ingredients, normally it should delete the recipe too.
        await this.prisma.deleteMany({
            where: {
                ingredients: {
                    some: {
                        itemId
                    }
                }
            }
        });

        // Fix: delete all recipes contains no ingredients
        await this.prisma.deleteMany({
            where: {
                ingredients: {
                    none: {}
                }
            }
        });
    }

    /**
     * Convert an array of recipes to readable data
     * @param data
     * @private
     */
    recipesToReadable(data: RecipeData[]): ReadableRecipeData[] {
        return data.map((recipe) => this.recipeToReadable(recipe));
    }

    /**
     * Convert a recipe to readable data
     * @param data
     * @private
     */
    recipeToReadable(data: RecipeData): ReadableRecipeData {
        return {
            id: data.id,
            name: data.name,
            type: data.type,
            custom: data.custom,
            projectId: data.projectId,
            createdAt: data.createdAt?.getTime(),
            updatedAt: data.updatedAt?.getTime(),
            ingredients:
                data.ingredients?.map((ingredient) => ({
                    slot: ingredient.slot,
                    count: ingredient.count,
                    id: ingredient.id,
                    item: new ItemRepository(prisma.item).itemToReadable(ingredient.item)
                })) ?? []
        };
    }

    private slotDataToIngredient(slots: SlotData[]): CreateIngredientData[] {
        const ingredients = [] as CreateIngredientData[];
        for (const element of slots) {
            if (!element.item) continue;

            ingredients.push({
                slot: element.slot,
                itemId: element.item.id,
                count: element.count ?? 1
            });
        }

        return ingredients;
    }
}
