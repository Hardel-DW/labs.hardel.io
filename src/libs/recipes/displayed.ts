import { ReadableRecipeData } from '@/types/minecraft';
import { RecipeType } from '@/libs/constant';

const grid = 3;

/**
 * Randomly places ingredient items within a recipe data object.
 *
 * @param {ReadableRecipeData} data - The recipe data to apply random placement to.
 * @returns {ReadableRecipeData} - The modified recipe data with random placement applied.
 */
export const randomPlacement = (data: ReadableRecipeData): ReadableRecipeData => {
    const newData = JSON.parse(JSON.stringify(data)) as ReadableRecipeData;
    const { type, ingredients } = newData;
    if (ingredients.length === 0) return newData;

    switch (type) {
        case RecipeType.SHAPELESS: {
            const placement: Array<string> = Array.from({ length: 9 }, (_, index) => `crafting:${index}`);
            for (const item of ingredients) {
                if (item.slot === 'crafting:result') continue;

                const randomIndex = Math.floor(Math.random() * placement.length);
                item.slot = placement[randomIndex];
                placement.splice(randomIndex, 1);
            }
            break;
        }
        case RecipeType.SHAPED: {
            const itemsPositions = ingredients
                .filter((item) => item.slot !== 'crafting:result')
                .map((item) => parseInt(item.slot.split(':')[1]));

            const { width, height } = getLengthAndHeight(itemsPositions, grid);
            if (width === grid && height === grid) break;

            const missingCells = getMissingCells(itemsPositions, grid);
            const cellsWithMissingCells = itemsPositions.concat(missingCells);
            const origin = getPatternOrigin(cellsWithMissingCells);

            const possiblePositions = possibilities(width, height, grid);
            const randomPositions = possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
            const randomPositionsOrigin = randomPositions[0];

            const x = origin % grid;
            const y = Math.floor(origin / grid);
            const diffX = x - (randomPositionsOrigin % grid);
            const diffY = y - Math.floor(randomPositionsOrigin / grid);

            for (const item of ingredients) {
                if (item.slot === 'crafting:result') continue;
                const position = parseInt(item.slot.split(':')[1]);
                const newX = position % grid;
                const newY = Math.floor(position / grid);

                item.slot = `crafting:${newX - diffX + (newY - diffY) * grid}`;
            }

            break;
        }
    }

    return newData;
};

/**
 * Calculates the minimum and maximum rows and columns of a given set of elements.
 *
 * @param {number[]} elements - The array of elements to calculate the rows and columns for.
 * @param {number} x - The number of columns per row.
 * @returns {Object} - An object containing the minimum and maximum rows and columns.
 */
const getRowAndCol = (elements: number[], x: number): { minRow: number; maxRow: number; minCol: number; maxCol: number } => {
    if (elements.length === 0) return { minRow: 0, maxRow: 0, minCol: 0, maxCol: 0 };

    const sortedElements = elements.sort((a, b) => a - b);
    let minRow = Infinity;
    let maxRow = -Infinity;
    let minCol = Infinity;
    let maxCol = -Infinity;

    sortedElements.forEach((element) => {
        const row = Math.floor(element / x);
        const col = element % x;
        minRow = Math.min(minRow, row);
        maxRow = Math.max(maxRow, row);
        minCol = Math.min(minCol, col);
        maxCol = Math.max(maxCol, col);
    });

    return { minRow, maxRow, minCol, maxCol };
};

/**
 * Calculates the origin of a pattern.
 *
 * @param {number[]} pattern - The pattern to calculate the origin of.
 * @returns {number} - The origin of the pattern.
 */
const getPatternOrigin = (pattern: number[]): number => {
    let min = Infinity;
    for (const position of pattern) {
        if (position < min) min = position;
    }

    return min === Infinity ? 0 : min;
};

/**
 * Calculates the missing cells from a range of cells based on a given maximum value.
 *
 * @param {number[]} cells - The array of cells.
 * @param {number} x - The maximum value.
 * @returns {number[]} - The array of missing cells.
 */
const getMissingCells = (cells: number[], x: number): number[] => {
    const { minRow, maxRow, minCol, maxCol } = getRowAndCol(cells, x);
    const missingCells: number[] = [];

    for (let row = minRow; row <= maxRow; row++) {
        for (let col = minCol; col <= maxCol; col++) {
            const cell = row * x + col;
            if (!cells.includes(cell)) {
                missingCells.push(cell);
            }
        }
    }

    return missingCells;
};

/**
 * Calculates the width and height of a given array of elements based on the specified value.
 *
 * @param {number[]} elements - The array of elements.
 * @param {number} x - The specified value.
 *
 * @returns {Object} - An object containing the calculated width and height.
 *                    The object has two properties: width and height.
 *                    The width represents the difference between the maximum and minimum column indices, plus 1.
 *                    The height represents the difference between the maximum and minimum row indices, plus 1.
 *                    If the elements array is empty, both width and height are set to 0.
 */
const getLengthAndHeight = (elements: number[], x: number): { width: number; height: number } => {
    if (elements.length === 0) return { width: 0, height: 0 };

    const { minRow, maxRow, minCol, maxCol } = getRowAndCol(elements, x);
    const width = maxCol - minCol + 1;
    const height = maxRow - minRow + 1;

    return { width, height };
};

/**
 * Calculate the possible combinations of crafting slots for a given width, height, and maximum dimension.
 *
 * @param {number} width - The width of the crafting slots.
 * @param {number} height - The height of the crafting slots.
 * @param {number} x - The maximum dimension of the crafting slots.
 * @returns {number[][]} - An array of all possible combinations of crafting slots.
 */
const possibilities = (width: number, height: number, x: number): number[][] => {
    if (width <= 0 || height <= 0) return [];
    if (width > x || height > x) return [];

    const craftingSlots: number[][] = Array.from({ length: x }, (_, i) => Array.from({ length: x }, (_, j) => j + x * i));
    const possibilities: number[][] = [];

    for (let i: number = 0; i < craftingSlots.length - height + 1; i++) {
        for (let j: number = 0; j < craftingSlots[i].length - width + 1; j++) {
            const validPosition = craftingSlots.slice(i, i + height).map((a) => a.slice(j, j + width));
            possibilities.push(validPosition.flat());
        }
    }

    return possibilities;
};
