import React, { Suspense } from 'react';
import Image from 'next/image';
import Table from '@images/design/minecraft/custom_crafting_table.webp';
import CraftingOptions from '@main/generator/crafting/(component)/CraftingOptions';
import CodePreview from '@main/generator/crafting/(component)/CodePreview';
import InventoryManager from '@main/generator/crafting/(component)/InventoryManager';
import CraftingGroupButton from '@main/generator/crafting/(component)/CraftingGroupButton';
import DNDContextProvider from '@components/dnd/DNDContext';
import Link from 'next/link';
import MinecraftGrid from '@icons/MinecraftGrid';
import DroppableCraftingTableGUI from '@components/minecraft/gui/crafting/Droppable';
import InventoryLoading from '@main/generator/crafting/(component)/InventoryLoading';

export default async function Page() {
    return (
        <DNDContextProvider>
            <div className={'flex flex-col md:flex-row'}>
                <div className={'flex flex-col w-full md:w-1/2'}>
                    <div className={'pl-10 pr-5 my-10'}>
                        <div className={'glassmorphism relative p-4'}>
                            <CraftingGroupButton />
                            <div className={'my-6 flex justify-center'}>
                                <DroppableCraftingTableGUI />
                            </div>
                            <CraftingOptions />
                            <div className={'absolute top-0 right-0 w-16 h-16 m-6'}>
                                <Image src={Table} alt={''} width={64} height={64} />
                            </div>
                        </div>

                        <CodePreview />
                    </div>
                </div>
                <div className={'flex flex-col w-full md:w-1/2'}>
                    <div className={'pr-10 pl-5 my-10'}>
                        <div className={'glassmorphism px-10'}>
                            <Suspense fallback={<InventoryLoading />}>
                                <InventoryManager />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>

            <Link href={'/generator/crafting/recipe'}>
                <div
                    className={
                        'fixed z-20 bottom-8 right-8 w-16 h-16 rainbow-border rounded-full hover:scale-90 transition ease-in-out duration-200 cursor-pointer'
                    }
                >
                    <div className={'flex justify-center items-center p-4'}>
                        <MinecraftGrid className={'w-full h-full fill-white'} />
                    </div>
                </div>
            </Link>
        </DNDContextProvider>
    );
}
