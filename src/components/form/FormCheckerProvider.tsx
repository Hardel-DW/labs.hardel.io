'use client';

import React, { createContext, useCallback, useMemo, useState } from 'react';

type FormCheckerContextType = {
    valid: boolean;
    setKeyValue: (keys: string, value: boolean) => void;
};

export const FormCheckerContext = createContext<FormCheckerContextType>({} as FormCheckerContextType);
export default function FormCheckerProvider({ children }: { children: React.ReactNode }) {
    const [keys, setKeys] = useState<Map<string, boolean>>(new Map());

    const valid = useMemo(() => (keys.size > 0 ? !Array.from(keys.values()).every((value) => value) : true), [keys]);

    const setKeyValue = useCallback((key: string, value: boolean) => {
        setKeys((keys) => {
            keys.set(key, value);
            return new Map(keys);
        });
    }, []);

    return <FormCheckerContext.Provider value={{ valid, setKeyValue }}>{children}</FormCheckerContext.Provider>;
}
