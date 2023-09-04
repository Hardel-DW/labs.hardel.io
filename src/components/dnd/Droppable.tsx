'use client';

import React, { useContext } from 'react';
import { DNDContext } from '@/components/dnd/DNDContext';

type Props = {
    children: React.ReactNode;
    handleDrop: (item: any) => void;
    acceptId: string[];
    hovered?: (isHovered: boolean) => void;
    spanAttributes?: React.HTMLAttributes<HTMLSpanElement>;
};

export default function Droppable(props: Props) {
    const { item, id } = useContext(DNDContext);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (props.acceptId.includes(id)) {
            props.hovered?.(true);
        }
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        props.hovered?.(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (props.acceptId.includes(id)) {
            props.handleDrop(item);
            props.hovered?.(false);
        }
    };

    return (
        <span {...props.spanAttributes} onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave}>
            {props.children}
        </span>
    );
}
