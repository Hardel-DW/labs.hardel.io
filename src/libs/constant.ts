import { SlotData } from '@/types/minecraft';

/**
 * Represents the different types of inventory.
 *
 * @enum {string}
 * @readonly
 * @memberof InventoryType
 */
export enum InventoryType {
    SEARCH = 'search',
    VANILLA = 'vanilla',
    CUSTOM = 'modded'
}

/**
 * Represents the different types of errors that can occur.
 *
 * @enum {string}
 * @readonly
 */
export enum ErrorType {
    MethodNotAllowed = 'MethodNotAllowed',
    NotFound = 'Not Found',
    BadRequest = 'Bad Request',
    BadParameter = 'Bad Parameter',
    InternalServerError = 'Internal Server Error',
    Unauthorized = 'Unauthorized',
    Forbidden = 'Forbidden'
}

/**
 * Represents the status codes that can be returned by an HTTP API.
 */
export enum StatusCode {
    MethodNotAllowed = 405,
    NotFound = 404,
    BadRequest = 400,
    BadParameter = 400,
    InternalServerError = 500,
    Unauthorized = 401,
    Forbidden = 403,
    Ok = 200,
    Created = 201,
    NoContent = 204
}

/**
 * Returns the value for a given recipe type.
 *
 * @param {RecipeType} type - The recipe type.
 * @returns {string} The corresponding value for the recipe type.
 */
export const recipeTypeToValue = (type: RecipeType): string => {
    switch (type) {
        case RecipeType.SHAPED:
            return 'minecraft:crafting_shaped';
        case RecipeType.EXACT_SHAPED:
            return 'minecraft:crafting_shaped';
        case RecipeType.SHAPELESS:
            return 'minecraft:crafting_shapeless';
        case RecipeType.SMELTING:
            return 'minecraft:smelting';
        case RecipeType.BLASTING:
            return 'minecraft:blasting';
        case RecipeType.SMOKING:
            return 'minecraft:smoking';
        case RecipeType.CAMPFIRE:
            return 'minecraft:campfire_cooking';
        case RecipeType.STONE_CUTTING:
            return 'minecraft:stonecutting';
        case RecipeType.SMITHING:
            return 'minecraft:smithing';
        default:
            return 'minecraft:crafting_shaped';
    }
};

export const DEFAULT_SLOT_VALUE: SlotData[] = [{ slot: 'crafting:result', count: 1 }];

export const AGO_SINCE = [
    {
        name: 'second',
        value: 0,
        suffix: 's'
    },
    {
        name: 'minutes',
        value: 60,
        suffix: 'm'
    },
    {
        name: 'hours',
        value: 60 * 60,
        suffix: 'h'
    },
    {
        name: 'days',
        value: 60 * 60 * 24,
        suffix: 'd'
    },
    {
        name: 'weeks',
        value: 60 * 60 * 24 * 7,
        suffix: 'w'
    },
    {
        name: 'months',
        value: 60 * 60 * 24 * 30,
        suffix: 'mo'
    },
    {
        name: 'years',
        value: 60 * 60 * 24 * 365,
        suffix: 'y'
    }
];

export const ROLES = [
    {
        value: 'ADMIN',
        name: 'Admin'
    },
    {
        value: 'USER',
        name: 'User'
    }
];

export const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

export enum RecipeType {
    SHAPELESS = 'shapeless',
    SHAPED = 'shaped',
    EXACT_SHAPED = 'exact_shaped',
    SMELTING = 'smelting',
    BLASTING = 'blasting',
    SMOKING = 'smoking',
    CAMPFIRE = 'campfire',
    STONE_CUTTING = 'stone_cutting',
    SMITHING = 'smithing'
}

export const VERSIONS = [
    {
        value: '1.20',
        name: 'Minecraft Java: 1.20'
    },
    {
        value: '1.19',
        name: 'Minecraft Java: 1.19'
    }
];
