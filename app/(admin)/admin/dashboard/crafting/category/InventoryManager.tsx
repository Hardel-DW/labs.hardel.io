'use client';

import Category from '@components/minecraft/Category';
import MinecraftItem from '@components/minecraft/MinecraftItem';
import React, { useMemo } from 'react';
import FormInput from '@components/form/input';
import WhiteButton from '@components/form/Button/White';
import { ReadableCategoryData, ReadableItemData } from '@definitions/minecraft';
import Drawer, { DrawerProps } from '@components/drawer';
import AdminCreateItem from '@components/drawer/container/item/AdminCreateItem';
import AdminCategory, { AdminCategoryDefaultValue } from '@components/drawer/container/AdminCategory';
import AdminAddItem from '@components/drawer/container/AdminAddItem';

type Props = { data: Array<ReadableCategoryData> };
export default function InventoryManager({ data }: Props) {
    const [search, setSearch] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState<AdminCategoryDefaultValue>();
    const [isOpened, setIsOpened] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState<Partial<ReadableItemData>>();
    const [selectedDrawer, setSelectedDrawer] = React.useState<string>();

    const drawer = useMemo(() => {
        const drawersData: DrawerProps[] = [
            {
                id: 'create-item',
                title: 'Create Item',
                description: 'Create a new item',
                component: <AdminCreateItem onClose={() => setIsOpened(false)} isCreating={true} defaultValues={selectedItem} />
            },
            {
                id: 'edit-item',
                title: 'Item Configuration',
                description: 'Configuration of the item, you can change data or delete it',
                component: <AdminCreateItem onClose={() => setIsOpened(false)} isCreating={false} defaultValues={selectedItem} />
            },
            {
                id: 'create-category',
                title: 'Create Category',
                description: 'Create a new category',
                component: <AdminCategory onClose={() => setIsOpened(false)} isCreating={true} />
            },
            {
                id: 'edit-category',
                title: 'Category Configuration',
                description: 'Configuration of the category, you can change data or delete it',
                component: <AdminCategory onClose={() => setIsOpened(false)} isCreating={false} defaultValues={selectedCategory} />
            },
            {
                id: 'add-item',
                title: 'Add Item',
                description: 'Add an item to the category',
                component: <AdminAddItem onClose={() => setIsOpened(false)} categoryId={selectedCategory?.id} />
            }
        ];

        return drawersData.find((drawer) => drawer.id === selectedDrawer);
    }, [selectedCategory, selectedDrawer, selectedItem]);

    const displayItems = useMemo(() => {
        if (!selectedCategory) {
            const items = [...data].map((category) => category.items).flat();
            if (search.length < 3) return;

            return items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())).slice(0, 50);
        }

        const items = data.find((category) => category.id === selectedCategory.id)?.items;
        return items?.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    }, [data, selectedCategory, search]);

    const handleEditItem = (item: ReadableItemData) => {
        setSelectedItem(item);
        setSelectedDrawer('edit-item');
        setIsOpened(true);
    };

    const handleCreateItem = () => {
        const defaultCategory = data.find((category) => category.id === selectedCategory?.id);
        setSelectedItem({ categories: defaultCategory ? [defaultCategory] : [] });
        setSelectedDrawer('create-item');
        setIsOpened(true);
    };

    const handleEditCategory = () => {
        setSelectedDrawer('edit-category');
        setIsOpened(true);
    };

    const handleAddCategory = () => {
        setSelectedDrawer('create-category');
        setIsOpened(true);
    };

    const handleSelectCategory = (category: ReadableCategoryData) => {
        if (selectedCategory?.id === category.id) {
            setSelectedCategory(undefined);
            return;
        }

        setSelectedCategory({
            id: category.id,
            name: category.name,
            asset: category.asset
        });
    };

    const handleAddItem = () => {
        setSelectedDrawer('add-item');
        setIsOpened(true);
    };

    return (
        <>
            <div className={'my-10'}>
                <div className={'mb-4'}>
                    <div className={'flex justify-between items-center mb-4'}>
                        <p className={'text-white text-2xl font-normal mb-0 font-minecraft'}>Minecraft Items</p>
                        <div className={'flex gap-x-2'}>
                            {selectedCategory && (
                                <>
                                    <WhiteButton onClick={handleEditCategory}>Edit Category</WhiteButton>
                                    <WhiteButton onClick={handleAddItem}>Add Items</WhiteButton>
                                </>
                            )}
                            <WhiteButton onClick={handleAddCategory}>Add Category</WhiteButton>
                            <WhiteButton onClick={handleCreateItem}>Create items</WhiteButton>
                        </div>
                    </div>
                    <FormInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder={'Search an item'} />
                </div>
                <hr />
                <div className={'flex'}>
                    <div>
                        {data.map((category, index) => (
                            <Category
                                key={index}
                                category={category}
                                selected={selectedCategory?.id}
                                onClick={() => handleSelectCategory(category)}
                            />
                        ))}
                    </div>

                    <div
                        className={
                            'flex flex-auto min-h-[300px] max-h-[600px] bg-black/20 border border-white/20 rounded-r-xl overflow-y-auto'
                        }
                    >
                        {!selectedCategory && search.length > 2 && displayItems?.length === 0 && (
                            <div className={'flex items-center justify-center w-full h-full p-4'}>
                                <p className={'text-white text-center text-xl font-normal mb-0 minecraft'}>No results</p>
                            </div>
                        )}

                        {!selectedCategory && search.length <= 2 && (
                            <div className={'flex items-center justify-center w-full h-full p-4'}>
                                <p className={'text-white text-center text-font font-normal mb-0 minecraft'}>Search an item</p>
                            </div>
                        )}

                        <div className={'h-full p-4 flex flex-wrap items-start content-start'}>
                            {displayItems?.map((item, index) => (
                                <MinecraftItem key={index} item={item} onClick={() => handleEditItem(item)} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Drawer title={drawer?.title} description={drawer?.description} isOpened={isOpened} onClose={() => setIsOpened(false)}>
                {drawer?.component && drawer.component}
            </Drawer>
        </>
    );
}
