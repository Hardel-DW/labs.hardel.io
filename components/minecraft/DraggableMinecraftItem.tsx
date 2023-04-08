'use client';

import { ReadableItemData } from '@definitions/minecraft';
import React, { useContext } from 'react';
import Draggable from '@components/dnd/Draggable';
import { CraftingContext } from '@main/generator/crafting/(component)/CraftingContext';
import { TooltipContext } from '@components/minecraft/ItemTooltip/TooltipContext';
import { clx } from '@libs/utils';
import LoadingImage from '@components/LoadingImage';

type Props = {
    item: ReadableItemData;
    onClick?: (item: ReadableItemData) => void;
    selected?: boolean;
};

export default function DraggableMinecraftItem(props: Props) {
    const { setHoveredItem } = useContext(TooltipContext);
    const { setSelectedItem } = useContext(CraftingContext);

    return (
        <Draggable
            draggableId={'minecraftItem'}
            item={props.item}
            spanAttributes={{
                className: clx(
                    'aspect-square m-1 p-2 relative  relative cursor-move',
                    props.selected ? 'ring-2 ring-gold' : 'ring-2 ring-zinc-800'
                ),
                onMouseEnter: () => setHoveredItem(props.item),
                onMouseLeave: () => setHoveredItem(undefined),
                onClick: () => setSelectedItem(props.item)
            }}
        >
            <div onClick={() => props.onClick?.(props.item)}>
                {props.item.position ? (
                    <div
                        className={'item_atlas'}
                        style={{
                            backgroundPosition: `${props.item.position?.x}px ${props.item.position?.y}px`
                        }}
                    />
                ) : (
                    <LoadingImage
                        alt={'Minecraft Item'}
                        src={props.item.asset}
                        className={'w-full h-full pixelated hover:scale-125 transition ease-in-out'}
                    />
                )}
            </div>
        </Draggable>
    );
}
