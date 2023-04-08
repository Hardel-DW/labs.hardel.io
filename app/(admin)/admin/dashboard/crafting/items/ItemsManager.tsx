'use client';

import AdminPagination from '@components/admin/AdminPagination';
import { ReadableItemData } from '@definitions/minecraft';
import Image from 'next/image';
import React from 'react';
import Drawer from '@components/drawer';
import AdminCreateItem from '@components/drawer/container/item/AdminCreateItem';
import Harion from '@images/logo/harion.webp';
import FormInput from '@components/form/input';
import MinecraftItem from '@components/minecraft/MinecraftItem';

const drawers = [
    { title: 'Create Item', description: 'Create a new item' },
    { title: 'Item Configuration', description: 'Configuration of the item, you can change data or delete it' }
];

export default function ItemsManager(props: { data: ReadableItemData[] }) {
    const [isOpened, setIsOpened] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState<Partial<ReadableItemData>>();
    const [selectedDrawer, setSelectedDrawer] = React.useState(drawers[0]);
    const [isEdit, setIsEdit] = React.useState(false);

    const handleEdit = (item: ReadableItemData) => {
        setIsEdit(true);
        setSelectedDrawer(drawers[1]);
        setSelectedItem(item);
        setIsOpened(true);
    };

    const handleAdd = () => {
        setIsEdit(false);
        setSelectedDrawer(drawers[0]);
        setSelectedItem(undefined);
        setIsOpened(true);
    };

    const handleClose = () => {
        setSelectedItem(undefined);
        setIsOpened(false);
    };

    return (
        <AdminPagination data={props.data} filterBy={'name'} title={'Items'} onAdd={() => handleAdd()}>
            {(items: ReadableItemData[]) => (
                <>
                    <div className={'my-10 flex gap-x-4'}>
                        <div
                            className={
                                'flex flex-auto h-fit min-h-[250px] max-h-[400px] bg-black/20 border border-white/20 rounded-r-xl overflow-y-auto'
                            }
                        >
                            <div className={'h-full p-4 flex flex-wrap items-start content-start'}>
                                {items?.map((item, index) => (
                                    <MinecraftItem key={index} item={item} onClick={() => handleEdit(item)} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <Drawer
                        title={selectedDrawer.title}
                        description={selectedDrawer.description}
                        isOpened={isOpened}
                        onClose={() => handleClose()}
                    >
                        <AdminCreateItem onClose={() => handleClose()} isCreating={!isEdit} defaultValues={selectedItem} />
                    </Drawer>
                </>
            )}
        </AdminPagination>
    );
}

function UsersCard() {
    return (
        <>
            <div className={'bg-black/20 border border-white/20 rounded-l-xl w-[350px] h-fit min-h-[250px] max-h-[600px] overflow-y-auto'}>
                <div className={'px-4'}>
                    <p className={'text-white text-xl font-bold pt-4'}>Users :</p>
                    <FormInput placeholder={'Search'} />
                    <hr className={'mt-0'} />
                </div>
                <div className={'h-full p-4 flex gap-y-2 flex-col flex-wrap'}></div>
                <div className={'flex justify-center items-center pt-4'}>
                    <p className={'text-white text-xl mb-0 font-bold'}>Search an user</p>
                </div>
            </div>

            <div
                className={
                    'flex justify-between items-center gap-x-4 bg-zinc-900 p-4 border-gold border cursor-pointer rounded-md opacity-50 hover:opacity-100 transition-[opacity]'
                }
            >
                <div className={'w-8 h-8 flex-shrink-0'}>
                    <Image src={Harion} alt={'Harion'} width={64} height={64} className={'rounded-full h-full w-full'} />
                </div>
                <div className={'flex-1'}>
                    <p className="text-xl mb-0 font-bold break-all">Hardel</p>
                    <small className="text-sm text-gray-400 font-bold break-words">12 Projects.</small>
                </div>
            </div>
        </>
    );
}
