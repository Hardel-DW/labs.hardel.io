'use client';

import React, { useContext, useMemo } from 'react';
import RainbowButton from '@components/form/Button/Rainbow';
import Add from '@icons/Common/Add';
import { ReadableCategoryData, ReadableItemData } from '@definitions/minecraft';
import Category from '@components/minecraft/Category';
import GroupButtonContainer from '@components/form/Button/GroupButton/GroupButtonContainer';
import GroupButtonItem from '@components/form/Button/GroupButton/GroupButtonItem';
import { InventoryType } from '@libs/constant';
import DraggableMinecraftItem from '@components/minecraft/DraggableMinecraftItem';
import FormInput from '@components/form/input';
import { DrawerContext } from '@main/generator/crafting/(component)/DrawerContext';
import UserCreateItem from '@components/drawer/container/item/UserCreateItem';
import useSWR, { mutate } from 'swr';
import fetcher from '@libs/request/fetcher';
import { CraftingContext } from '@main/generator/crafting/(component)/CraftingContext';
import Edit from '@icons/Common/Edit';
import Trash from '@icons/Common/Trash';
import LoadingImage from '@components/LoadingImage';
import { deleteItem } from '@libs/request/client/item';
import { useRouter } from 'next/navigation';
import { ModalContext } from '@components/modal/ModalContext';
import { getRecipesFromItem } from '@libs/request/client/recipe';
import { ErrorAlert } from '@components/alert';

type Props = {
    categories: Array<ReadableCategoryData>;
};

export default function Inventory(props: Props) {
    const { data, error, isLoading } = useSWR<ReadableItemData[]>('/api/items', fetcher);
    const { setOpen, setChildren } = useContext(DrawerContext);
    const { selectedItem } = useContext(CraftingContext);
    const { showConfirmation } = useContext(ModalContext);
    const [selected, setSelected] = React.useState<string>(props.categories[0].id);
    const [search, setSearch] = React.useState<string>('');
    const [type, setType] = React.useState<InventoryType>(InventoryType.SEARCH);
    const router = useRouter();

    const displayItems = useMemo(() => {
        if (type === InventoryType.SEARCH) {
            if (search.length < 3) return;

            const items = [...props.categories]
                .map((category) => category.items)
                .flat()
                .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
                .filter((item, index, self) => self.findIndex((i) => i.id === item.id) === index);

            return [...(items ?? []), ...(data ?? [])].slice(0, 50);
        } else if (type === InventoryType.VANILLA) {
            const items = props.categories.find((category) => category.id === selected)?.items;

            return [...(items ?? []), ...(data ?? [])];
        } else if (type === InventoryType.CUSTOM) {
            return data ?? [];
        } else {
            return null;
        }
    }, [type, props.categories, search, selected, data]);

    const handleCreated = () => {
        setChildren(<UserCreateItem onClose={() => setOpen(false)} isCreating={true} defaultValues={{}} />);
        setOpen(true);
    };

    const handleEdit = () => {
        setChildren(<UserCreateItem onClose={() => setOpen(false)} isCreating={false} defaultValues={selectedItem} />);
        setOpen(true);
    };

    const handleDelete = async () => {
        if (!selectedItem) return;
        const recipes = await getRecipesFromItem(selectedItem.id);

        showConfirmation(
            <>
                {recipes.length > 0 ? (
                    <ErrorAlert>
                        <p>
                            This item is used in {recipes.length} recipe{recipes.length > 1 ? 's' : ''}. Deleting this item will also delete
                            the recipe{recipes.length > 1 ? 's' : ''}.
                        </p>
                    </ErrorAlert>
                ) : (
                    <p>Are you sure you want to delete this item?</p>
                )}
            </>,
            async () => {
                deleteItem(selectedItem.id).then(() => {
                    router.refresh();
                    mutate('/api/items');
                });
            }
        );
    };

    return (
        <React.Fragment>
            <div className={'my-10'}>
                <div className={'mb-4'}>
                    <div className={'flex justify-between items-center mb-4'}>
                        <p className={'text-white text-2xl font-normal mb-0 font-minecraft'}>Minecraft Items</p>
                        <RainbowButton className={'flex justify-center items-center'} onClick={() => handleCreated()}>
                            <Add className={'w-8 h-8 fill-white mr-2'} />
                            Add new item
                        </RainbowButton>
                    </div>
                    <FormInput type="text" placeholder="Search an item" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className={'mb-4 flex justify-between items-center'}>
                    <GroupButtonContainer defaultValue={InventoryType.SEARCH}>
                        <GroupButtonItem id={InventoryType.SEARCH} onSelect={() => setType(InventoryType.SEARCH)}>
                            Search
                        </GroupButtonItem>
                        <GroupButtonItem id={InventoryType.VANILLA} onSelect={() => setType(InventoryType.VANILLA)}>
                            Vanilla
                        </GroupButtonItem>
                        <GroupButtonItem id={InventoryType.CUSTOM} onSelect={() => setType(InventoryType.CUSTOM)}>
                            Custom
                        </GroupButtonItem>
                    </GroupButtonContainer>

                    {selectedItem && (
                        <div className={'bg-black/20 rounded-xl p-2 gap-x-4 flex items-center'}>
                            <Edit
                                onClick={() => handleEdit()}
                                className={'w-6 h-6 fill-zinc-300 hover:scale-125 transition-transform ease-out cursor-pointer'}
                            />
                            <Trash
                                onClick={() => handleDelete()}
                                className={'w-6 h-6 fill-red-500 hover:scale-125 transition-transform ease-out cursor-pointer'}
                            />
                            <LoadingImage src={selectedItem?.asset} alt={selectedItem?.name} className={'w-8 h-8 rounded'} />
                        </div>
                    )}
                </div>
                <hr />
                <div className={'flex'}>
                    {type === InventoryType.VANILLA && (
                        <div>
                            {props.categories.map((category) => (
                                <Category
                                    key={category.id}
                                    category={category}
                                    selected={selected}
                                    onClick={() => setSelected(category.id)}
                                />
                            ))}
                        </div>
                    )}

                    <div
                        className={
                            'flex flex-auto min-h-[300px] max-h-[600px] bg-black/20 border border-white/20 rounded-r-xl overflow-y-auto'
                        }
                    >
                        {type === InventoryType.SEARCH && search.length > 2 && displayItems?.length === 0 && (
                            <div className={'flex items-center justify-center w-full h-full p-4'}>
                                <p className={'text-white text-center text-xl font-normal mb-0 minecraft'}>No results</p>
                            </div>
                        )}

                        {type === InventoryType.SEARCH && search.length <= 2 && (
                            <div className={'flex items-center justify-center w-full h-full p-4'}>
                                <p className={'text-white text-center text-font font-normal mb-0 minecraft'}>Search an item</p>
                            </div>
                        )}

                        {type === InventoryType.CUSTOM && (displayItems?.length ?? 0) === 0 && (
                            <div className={'flex items-center justify-center w-full h-full p-4'}>
                                {isLoading && <p className={'text-white text-center text-xl font-normal mb-0 minecraft'}>Loading...</p>}
                                {error && <p className={'text-white text-center text-xl font-normal mb-0 minecraft'}>Error</p>}
                                {data && data.length === 0 && (
                                    <p className={'text-white text-center text-xl font-normal mb-0 minecraft'}>No items</p>
                                )}
                            </div>
                        )}

                        {(displayItems?.length ?? 0) > 0 && (
                            <div className={'grid grid-cols-items grid-rows-items w-full'}>
                                {displayItems
                                    ?.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
                                    ?.map((item, key) => (
                                        <DraggableMinecraftItem key={key} item={item} selected={selectedItem?.id === item.id} />
                                    ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className={'flex mt-4 bg-black/10 border border-white/20 rounded-xl'}>
                    <div className="p-4">
                        <p className={'text-zinc-300 text-base font-bold mb-0'}>Some tips:</p>
                        <ul className={'text-zinc-400 text-sm font-normal mb-0 list-disc px-4'}>
                            <li>You can drag and drop items from the inventory to the crafting table</li>
                            <li>Left click on an item to select it, then left click on the crafting table to place it</li>
                            <li>Right click on an item to show some options like edit or delete</li>
                        </ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
