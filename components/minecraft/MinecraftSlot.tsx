'use client';

import Image from 'next/image';
import React, { useContext } from 'react';
import { TooltipContext } from '@components/minecraft/ItemTooltip/TooltipContext';
import { ReadableRecipeData } from '@definitions/minecraft';

type Props = {
    id: string;
    data: ReadableRecipeData;
};

export default function MinecraftSlot(props: Props) {
    const { setHoveredItem } = useContext(TooltipContext);
    const ingredientData = props.data.ingredients.find((ingredient) => ingredient.slot === props.id);
    const item = ingredientData?.item;

    return (
        <span
            onMouseEnter={() => setHoveredItem(item)}
            onMouseLeave={() => setHoveredItem(undefined)}
            className={'border border-white/20 w-14 h-14 p-[4px] relative hover:bg-zinc-800'}
        >
            {item?.asset && <Image alt={''} src={item.asset} height={64} width={64} className={'w-full h-full pixelated'} />}
            {item && ingredientData.count > 1 && (
                <span className={'absolute bottom-0 right-0 text-xl text-white font-seven'}>{ingredientData.count}</span>
            )}
        </span>
    );
}
