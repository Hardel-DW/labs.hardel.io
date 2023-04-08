import { ReadableItemData, SlotData } from '@definitions/minecraft';
import { RecipeType } from '@prisma/client';
import { recipeTypeToValue } from '@libs/constant';

/**
 * Transforms ingredients into a shapeless recipe
 * @param {SlotData[]} ingredients
 * @param {ReadableItemData} result
 * @param result
 */
export const makeShapelessRecipes = (ingredients: SlotData[], result?: SlotData) => {
    const ingredientsItem: Array<{ item: string }> = [];
    for (const ingredient of ingredients) {
        if (ingredient.item) {
            ingredientsItem.push({ item: ingredient.item.minecraftId });
        }
    }

    return {
        type: recipeTypeToValue(RecipeType.SHAPELESS),
        ingredients: ingredientsItem,
        result: {
            item: result?.item?.minecraftId,
            count: result?.count || 1
        }
    };
};
