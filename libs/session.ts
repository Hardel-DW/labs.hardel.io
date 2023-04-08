import { cache } from 'react';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@session';
import RecipeRepository from '@repositories/Recipe';
import prisma from '@libs/prisma';

export const getSession = cache(async () => {
    return await unstable_getServerSession(authOptions);
});

export const preloadSession = () => {
    void getSession();
};

export const getCraftData = cache(async (id: string) => {
    return await new RecipeRepository(prisma.recipes).findByProject(id);
});

export const preloadCraftData = (id: string) => {
    void getCraftData(id);
};
