import { PrismaClient } from '@prisma/client';
import { CATEGORIES_ITEMS } from '../resources/categories_items';
import { CATEGORIES } from '../resources/categories';
import { ITEMS } from '../resources/items';

const prisma = new PrismaClient();
async function main() {
    const deleteCI = prisma.$queryRaw`DELETE FROM _CategoryToItem`;
    const deleteCategory = prisma.category.deleteMany();
    const deleteIngredient = prisma.ingredient.deleteMany();
    const deleteRecipe = prisma.recipes.deleteMany();
    const deleteItems = prisma.item.deleteMany();

    await prisma.$transaction([deleteCI, deleteIngredient, deleteRecipe, deleteCategory, deleteItems]);
    console.log('Deleted all data');

    await prisma.category.createMany({
        data: CATEGORIES.map((category) => ({
            name: category.name,
            asset: category.asset,
            categoryId: category.categoryId
        }))
    });
    console.log('Created categories');

    await prisma.item.createMany({
        data: ITEMS.map((item) => ({
            custom: false,
            name: item.readable,
            minecraftId: item.id,
            assetX: item.positionX,
            assetY: item.positionY
        }))
    });
    console.log('Created items');

    const categoriesData = await prisma.category.findMany({
        select: {
            id: true,
            categoryId: true
        }
    });
    console.log('Fetched all categories');

    const itemsData = await prisma.item.findMany({
        select: {
            id: true,
            minecraftId: true
        }
    });
    console.log('Fetched all items');

    for (const categoriesItems of CATEGORIES_ITEMS) {
        const { category, items } = categoriesItems;
        const categoryId = categoriesData.find((c) => c.categoryId === category)?.id;
        if (!categoryId) {
            throw new Error(`Category ${category} not found`);
        }

        const itemIds = items.map((minecraftId) => {
            const item = itemsData.find((item) => item.minecraftId === minecraftId)?.id;
            if (!item) {
                throw new Error(`Item ${minecraftId} not found`);
            }

            return item;
        });

        console.log('Batch update send packet for category', category);
        await prisma.category.update({
            where: {
                id: categoryId
            },
            data: {
                items: {
                    connect: itemIds.map((id) => ({ id }))
                }
            }
        });

        await new Promise((resolve) => setTimeout(resolve, 500));
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
