'use client';

import React, { useContext } from 'react';
import { DNDContext } from '@/components/dnd/DNDContext';

type Props = {
    children: React.ReactNode;
    handleDragStart?: (item: any) => void;
    handleDragEnd?: () => void;
    isDragging?: (isDragging: boolean) => void;
    draggableId: string;
    item: any;
    spanAttributes?: React.HTMLAttributes<HTMLSpanElement>;
};

export default function Draggable(props: Props) {
    const { setItem, setId } = useContext(DNDContext);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('text/plain', '');
        setItem(props.item);
        setId(props.draggableId);
        props.isDragging?.(true);
        props.handleDragStart?.(props.item);
    };

    const handleDragEnd = () => {
        props.isDragging?.(false);
        props.handleDragEnd?.();
    };

    return (
        <span {...props.spanAttributes} draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            {props.children}
        </span>
    );
}
