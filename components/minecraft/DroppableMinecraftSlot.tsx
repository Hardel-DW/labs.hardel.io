'use client';

import React, { useContext, useMemo } from 'react';
import Droppable from '@components/dnd/Droppable';
import { ReadableItemData } from '@definitions/minecraft';
import { CraftingContext } from '@main/generator/crafting/(component)/CraftingContext';
import { TooltipContext } from '@components/minecraft/ItemTooltip/TooltipContext';
import LoadingImage from '@components/LoadingImage';

type Props = {
    id: string;
};

export default function DroppableMinecraftSlot(props: Props) {
    const { setHoveredItem } = useContext(TooltipContext);
    const { setSlotItem, selectedItem, slots } = useContext(CraftingContext);
    const [isOver, setIsOver] = React.useState(false);

    const slot = useMemo(() => {
        return slots.find((element) => element.slot === props.id);
    }, [props.id, slots]);

    const handleClick = () => (slot?.item ? setSlotItem(props.id, undefined) : setSlotItem(props.id, selectedItem));

    return (
        <Droppable
            handleDrop={(item: ReadableItemData) => setSlotItem(props.id, item)}
            hovered={setIsOver}
            acceptId={['minecraftItem']}
            spanAttributes={{
                onClick: handleClick,
                className:
                    'border border-white/20 w-14 h-14 p-[4px] relative hover:bg-zinc-800' +
                    (isOver ? ' bg-zinc-700' : ' bg-black/50') +
                    (slot?.item ? ' cursor-pointer' : ' cursor-default'),
                onMouseEnter: () => setHoveredItem(slot?.item),
                onMouseLeave: () => setHoveredItem(undefined)
            }}
        >
            {slot?.item?.asset && <LoadingImage alt={'Minecraft Item'} src={slot.item.asset} className={'w-full h-full pixelated'} />}
            {slot?.item && slot?.count && slot.count > 1 && (
                <span className={'absolute bottom-0 right-0 text-xl text-white font-seven'}>{slot.count}</span>
            )}
        </Droppable>
    );
}
