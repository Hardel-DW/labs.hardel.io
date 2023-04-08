import FastFetcher from '@libs/request/fast-fetcher';
import { CreateRecipeModel, UpdateRecipeModel } from '@repositories/Recipe';

export const createRecipe = async (data: CreateRecipeModel) => {
    return await new FastFetcher('/api/recipe', 'POST').setBody({ data }).fetching();
};

export const updateRecipe = async (recipeId: string, data: UpdateRecipeModel) => {
    return await new FastFetcher('/api/recipe', 'PUT').setBody({ recipeId, data }).fetching();
};

export const deleteRecipe = async (recipeId: string) => {
    return await new FastFetcher('/api/recipe', 'DELETE').setBody({ recipeId }).fetching();
};
export const getRecipesFromProject = async () => {
    return await new FastFetcher('/api/recipe', 'GET').fetching();
};

export const getOneRecipe = async (id: string) => {
    return await new FastFetcher(`/api/recipe/${id}`, 'GET').fetching();
};

export const getRecipesFromItem = async (itemId: string) => {
    return await new FastFetcher(`/api/recipe/item/${itemId}`, 'GET').fetching<Array<any>>();
};
