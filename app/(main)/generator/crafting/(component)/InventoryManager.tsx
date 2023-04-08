import React, { use } from 'react';
import Inventory from '@main/generator/crafting/(component)/Inventory';
import { notFound } from 'next/navigation';
import CategoryRepository from '@repositories/Category';
import prisma from '@libs/prisma';

async function getCategoryData() {
    return await new CategoryRepository(prisma.category).findVanilla();
}

export default function InventoryManager() {
    const data = use(getCategoryData());
    if (!(data.length > 0)) {
        notFound();
    }

    return <Inventory categories={data} />;
}
