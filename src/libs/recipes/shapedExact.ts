import { RecipeKey, ShapedRecipe, ShapedRecipeLData, SlotData } from '@/types/minecraft';
import { RecipeType, recipeTypeToValue } from '@/libs/constant';

/**
 * Transforms ingredients and result into a shaped recipe
 * @param {SlotData[]} ingredients
 * @param {ReadableItemData} result
 * @param {ShapedRecipe} result
 */
export const makeShapedExactRecipes = (ingredients: SlotData[], result?: SlotData): ShapedRecipe => {
    const data = getAllKeys(ingredients);
    const keyList: RecipeKey = {};
    const pattern: string[] = [];

    for (const element of data) {
        keyList[element.key] = { item: element.item.minecraftId };
    }

    for (let i = 0; i < 3; i++) {
        let patternLine = '';
        for (let j = 0; j < 3; j++) {
            const slot = data.find((key) => key.slot.includes(i * 3 + j));
            patternLine += slot ? slot.key : ' ';
        }

        pattern.push(patternLine);
    }

    return {
        type: recipeTypeToValue(RecipeType.EXACT_SHAPED),
        pattern: pattern,
        key: keyList,
        result: {
            item: result?.item?.minecraftId,
            count: result?.count || 1
        }
    };
};

/**
 * Parse the slots id into a slot number
 * For example "crafting:2" will return 2
 * @param {string} slotId
 */
const parseSlotId = (slotId: string) => {
    const slotIdSplit = slotId.split(':');
    const slotIdNumber = slotIdSplit[slotIdSplit.length - 1];
    return parseInt(slotIdNumber);
};

const getAllKeys = (ingredients: SlotData[]): ShapedRecipeLData[] => {
    const keyLetter = ['H', 'A', 'R', 'D', 'E', 'L', '#', 'I', 'O'];
    const keyList: ShapedRecipeLData[] = [];

    const getRandomLetter = () => {
        const letter = keyLetter[Math.floor(Math.random() * keyLetter.length)];
        keyLetter.splice(keyLetter.indexOf(letter), 1);
        return letter;
    };

    for (const ingredient of ingredients) {
        if (ingredient.item) {
            const slotPosition = parseSlotId(ingredient.slot);

            const key = keyList.find((key) => key.item.id === ingredient.item?.id);
            if (key) {
                key.slot.push(slotPosition);
            } else {
                keyList.push({
                    key: getRandomLetter(),
                    item: ingredient.item,
                    slot: [slotPosition]
                });
            }
        }
    }

    return keyList;
};
