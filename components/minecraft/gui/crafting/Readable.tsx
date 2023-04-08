'use client';

import { ReadableRecipeData } from '@definitions/minecraft';
import MinecraftSlot from '@components/minecraft/MinecraftSlot';
import Image from 'next/image';
import Arrow from '@images/design/minecraft/arrow.webp';
import React, { useContext } from 'react';
import { randomPlacement } from '@libs/minecraft/crafting/displayed';
import Trash from '@icons/Common/Trash';
import Edit from '@icons/Common/Edit';
import { useRouter } from 'next/navigation';
import { deleteRecipe } from '@libs/request/client/recipe';
import { ToastContext, ToastStatus } from '@components/toast/ToastContainer';
import HardelLoader from '@components/loader/HardelLoader';
import { clx } from '@libs/utils';
import { RecipeType } from '@prisma/client';

type Props = {
    title: string;
    data: ReadableRecipeData;
    onEdit?: () => void;
};

export default function CraftingTableGUI(props: Props) {
    const { addToast } = useContext(ToastContext);
    const [recipe, setRecipe] = React.useState(props.data);
    const [loading, setLoading] = React.useState(false);
    const [deleted, setDeleted] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        const interval = setInterval(() => {
            setRecipe(randomPlacement(props.data));
        }, 1000);

        return () => clearInterval(interval);
    }, [props.data]);

    const handleDelete = () => {
        setLoading(true);
        deleteRecipe(props.data.id)
            .then(() => {
                router.refresh();
                addToast(ToastStatus.SUCCESS, 'Recipe deleted', 'The recipe has been deleted');
                setDeleted(true);
            })
            .catch((e) => {
                addToast(ToastStatus.ERROR, 'Recipe deletion failed', e.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className={clx('relative p-4 glassmorphism flex justify-center', deleted || loading ? 'opacity-50' : '')}>
            <div>
                <p className={'text-lg text-white text-start font-seven mb-2'}>{props.title}</p>
                <div className={'flex justify-between items-center w-[18rem]'}>
                    <div className={'w-[10.5rem] flex flex-wrap'}>
                        {Array.from({ length: 9 }).map((_, index) => (
                            <MinecraftSlot data={recipe} id={'crafting:' + +index} key={index} />
                        ))}
                    </div>
                    <Image src={Arrow} alt={''} width={32} height={27} />
                    <MinecraftSlot data={props.data} id={'crafting:result'} />
                </div>
            </div>
            <div className={'absolute bottom-4 right-4'}>
                <p className={'text-sm text-zinc-500 border border-zinc-500 rounded-xl px-2 py-1 mb-0'}>
                    {recipe.type === RecipeType.EXACT_SHAPED
                        ? 'Exact Pattern'
                        : recipe.type === RecipeType.SHAPELESS
                        ? 'Shapeless'
                        : 'Shaped'}
                </p>
            </div>
            <div className={'absolute bottom-4 left-4'}>
                <div className={'flex flex-col gap-y-4'}>
                    {deleted || loading ? (
                        <HardelLoader className={'w-6 h-6'} />
                    ) : (
                        <>
                            <Edit className={'w-6 h-6 fill-zinc-500 hover:fill-gold'} onClick={() => props.onEdit?.()} />
                            <Trash className={'w-6 h-6 fill-zinc-500 hover:fill-red-700'} onClick={() => handleDelete()} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
