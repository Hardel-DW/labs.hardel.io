import FastFetcher from '@libs/request/fast-fetcher';
import { CreateCategoryModel, UpdateCategoryModel } from '@repositories/Category';

export const createCategory = async (data: CreateCategoryModel) => {
    return await new FastFetcher('/api/categories', 'POST').setBody({ data }).fetching();
};

export const updateCategory = async (categoryId: string, data: UpdateCategoryModel) => {
    return await new FastFetcher('/api/categories', 'PUT').setBody({ categoryId, data }).fetching();
};

export const deleteVanillaCategory = async (categoryId: string) => {
    return await new FastFetcher('/api/categories', 'DELETE').setBody({ categoryId }).fetching();
};

export const connectItem = async (categoryId: string, itemId: string) => {
    return await new FastFetcher('/api/categories/connect/vanilla', 'PATCH').setBody({ categoryId, itemId }).fetching();
};

export const connectCustomItemToCategory = async (categoryId: string, itemId: string) => {
    return await new FastFetcher('/api/categories/connect/custom', 'PATCH').setBody({ categoryId, itemId }).fetching();
};
