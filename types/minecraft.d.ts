export type ReadableItemData = {
    id: string;
    minecraftId: string;
    name: string;
    asset: string;
    position?: Position2D;
    custom?: boolean;
    tag?: any;
    projectId?: string;
    categories?: Omit<ReadableCategoryData, 'items' | 'asset'>[];
    createdAt?: number;
    updatedAt?: number;
};

export type ReadableCategoryData = {
    id: string;
    categoryId: string;
    name: string;
    asset: string;
    custom?: boolean;
    projectId?: string;
    items: Array<ReadableItemData>;
    createdAt?: number;
    updatedAt?: number;
};

export type ReadableRecipeData = {
    id: string;
    name: string;
    type: RecipeType;
    custom: boolean;
    ingredients: ReadableIngredientData[];
    projectId?: string;
    createdAt?: number;
    updatedAt?: number;
};

export type ReadableIngredientData = {
    id: number;
    slot: string;
    count: number;
    item: ReadableItemData;
};

export type SlotData = {
    slot: string;
    item?: ReadableItemData;
    count?: number;
};

export type RecipeKey = {
    [key: string]: {
        item: string;
    };
};

export type ShapedRecipeLData = {
    key: string;
    item: ReadableItemData;
    slot: number[];
};

export type ShapelessRecipe = {
    type: string;
    ingredients: Array<{ item: string }>;
    result: {
        item?: string;
        count?: number;
    };
};

export type ShapedRecipe = {
    type: string;
    pattern: string[];
    key: RecipeKey;
    result: {
        item?: string;
        count?: number;
    };
};

export type Recipe = ShapelessRecipe | ShapedRecipe;
