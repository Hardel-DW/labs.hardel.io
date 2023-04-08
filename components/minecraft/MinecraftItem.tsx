'use client';

import { ReadableItemData } from '@definitions/minecraft';
import React, { useContext } from 'react';
import { TooltipContext } from '@components/minecraft/ItemTooltip/TooltipContext';
import LoadingImage from '@components/LoadingImage';

type Props = {
    item: ReadableItemData;
    onClick?: () => void;
};

export default function MinecraftItem(props: Props) {
    const { setHoveredItem } = useContext(TooltipContext);

    return (
        <span
            onMouseEnter={() => setHoveredItem(props.item)}
            onMouseLeave={() => setHoveredItem(undefined)}
            onClick={props.onClick}
            className={'w-14 h-14 p-[6px] relative opacity-60 hover:opacity-100 transition ease-in-out cursor-pointer'}
        >
            <LoadingImage alt={'Minecraft Items'} src={props.item.asset} height={64} width={64} className={'w-full h-full pixelated'} />
        </span>
    );
}
