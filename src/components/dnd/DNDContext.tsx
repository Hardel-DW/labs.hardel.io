'use client';

import React, { createContext } from 'react';

type DNDContextProps = {
    item: any;
    setItem: (item: any) => void;
    setId: (id: string) => void;
    id: string;
};

export const DNDContext = createContext<DNDContextProps>({} as DNDContextProps);
export default function DNDContextProvider({ children }: { children: React.ReactNode }) {
    const [item, setItem] = React.useState<any>();
    const [id, setId] = React.useState('');

    return <DNDContext.Provider value={{ item, setItem, id, setId }}>{children}</DNDContext.Provider>;
}
