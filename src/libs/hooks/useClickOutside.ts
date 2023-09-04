import React, { useEffect } from 'react';

export default function UseClickOutside(ref: React.RefObject<HTMLElement>, callback: () => void) {
    useEffect(() => {
        const listener = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                callback();
            }
        };

        document.addEventListener('click', listener);

        return () => {
            document.removeEventListener('click', listener);
        };
    }, [callback, ref]);
}
