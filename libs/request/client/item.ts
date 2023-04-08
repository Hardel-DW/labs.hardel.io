import FastFetcher from '@libs/request/fast-fetcher';
import { CreateItemModel, UpdateItemModel } from '@repositories/Items';

export const createItem = async <T>(data: CreateItemModel) => {
    return await new FastFetcher('/api/items', 'POST').setBody({ data }).fetching<T>();
};

export const updateItem = async <T>(itemId: string, data: UpdateItemModel) => {
    return await new FastFetcher('/api/items', 'PUT').setBody({ itemId, data }).fetching<T>();
};

export const upsertItem = async <T>(isCreating: boolean, data: CreateItemModel | UpdateItemModel, itemId?: string) => {
    if (isCreating) {
        return await createItem<T>(data as CreateItemModel);
    } else if (itemId) {
        return await updateItem<T>(itemId, data as UpdateItemModel);
    }

    throw new Error('itemId is required');
};

export const deleteItem = async (itemId: string) => {
    return await new FastFetcher('/api/items', 'DELETE').setBody({ itemId }).fetching();
};

export const assetVanillaUploadItem = async (minecraftId: string, asset: File) => {
    return await new FastFetcher('/api/items/asset/vanilla', 'PATCH').setFormData({ minecraftId, asset }).fetching();
};

export const assetCustomUploadItem = async (itemId: string, asset: File) => {
    return await new FastFetcher('/api/items/asset/custom', 'PATCH').setFormData({ itemId, asset }).fetching();
};
