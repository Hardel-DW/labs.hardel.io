import { makeShapedExactRecipes } from '@/libs/recipes/shapedExact';
import { RecipeType, recipeTypeToValue } from '@/libs/constant';
import { Recipe, ShapedRecipe, SlotData } from '@/types/minecraft';

/**
 * Transforms ingredients and result into a shaped recipe
 * @param {SlotData[]} ingredients
 * @param {SlotData} result
 * @param result
 */
export const makeShapedRecipes = (ingredients: SlotData[], result?: SlotData): Recipe => {
    const shaped: ShapedRecipe = { ...makeShapedExactRecipes(ingredients, result) };

    if (
        shaped.pattern.length === 0 ||
        shaped.pattern.find((patternLine) => patternLine.length !== shaped.pattern[0].length) !== undefined
    ) {
        throw new Error('Invalid shaped recipe');
    }

    // Change the type to shaped
    shaped.type = recipeTypeToValue(RecipeType.SHAPED);

    // Remove left/right empty columns
    let startColIndex = shaped.pattern[0].length - 1;
    let endColIndex = 0;
    shaped.pattern.forEach((patternLine) => {
        const trimmedLine = patternLine.trim();
        if (trimmedLine.length === 0) return;

        const trimmedLineStartIndex = patternLine.indexOf(trimmedLine);
        startColIndex = Math.min(startColIndex, trimmedLineStartIndex);
        endColIndex = Math.max(endColIndex, trimmedLineStartIndex + trimmedLine.length - 1);
    });
    shaped.pattern = shaped.pattern.map((patternLine) => patternLine.slice(startColIndex, endColIndex + 1));

    // Remove top/bottom empty rows
    const startLineIndex = shaped.pattern.findIndex((patternLine) => patternLine.trim().length > 0);
    const endLineIndex =
        shaped.pattern.length -
        1 -
        shaped.pattern
            .slice()
            .reverse()
            .findIndex((patternLine) => patternLine.trim().length > 0);
    shaped.pattern = shaped.pattern.slice(startLineIndex, endLineIndex + 1);

    return shaped;
};
