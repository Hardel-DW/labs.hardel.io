'use client';

import React, { createContext } from 'react';
import { ReadableItemData } from '@definitions/minecraft';

type TooltipContextData = {
    hoveredItem: ReadableItemData | undefined;
    setHoveredItem: (item: ReadableItemData | undefined) => void;
};

export const TooltipContext = createContext<TooltipContextData>({} as TooltipContextData);
export default function TooltipContextProvider({ children }: { children: React.ReactNode }) {
    const [hoveredItem, setHoveredItem] = React.useState<ReadableItemData>();

    return <TooltipContext.Provider value={{ hoveredItem, setHoveredItem }}>{children}</TooltipContext.Provider>;
}
