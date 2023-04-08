import React from 'react';
import InventoryManager from '@admin/admin/dashboard/crafting/category/InventoryManager';
import TooltipContextProvider from '@components/minecraft/ItemTooltip/TooltipContext';
import ItemTooltip from '@components/minecraft/ItemTooltip';
import CategoryRepository from '@repositories/Category';
import prisma from '@libs/prisma';

async function getData() {
    return await new CategoryRepository(prisma.category).findVanilla();
}

export default async function CategoriesPage() {
    const data = await getData();

    return (
        <TooltipContextProvider>
            <InventoryManager data={data} />
            <ItemTooltip />
        </TooltipContextProvider>
    );
}
