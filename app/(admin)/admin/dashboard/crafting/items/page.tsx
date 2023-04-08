import React from 'react';
import TooltipContextProvider from '@components/minecraft/ItemTooltip/TooltipContext';
import ItemTooltip from '@components/minecraft/ItemTooltip';
import ItemsManager from '@admin/admin/dashboard/crafting/items/ItemsManager';
import ItemRepository from '@repositories/Items';
import prisma from '@libs/prisma';

async function getData() {
    return await new ItemRepository(prisma.item).findAll(true);
}

export default async function ItemsPage() {
    const data = await getData();

    return (
        <TooltipContextProvider>
            <ItemsManager data={data} />
            <ItemTooltip />
        </TooltipContextProvider>
    );
}
