'use client';

import { useEffect, useState } from 'react';

export default function Skew() {
    const [skew, setSkew] = useState(30);

    useEffect(() => {
        const skewCalc = () => {
            const base = Math.min(Math.max(30 - window.scrollY / 10, 0), 30);
            setSkew(base);
        };

        window.addEventListener('scroll', skewCalc);
        return () => window.removeEventListener('scroll', skewCalc);
    }, []);

    return (
        <span
            className={'absolute -bottom-full left-0 w-full h-full -z-10 bg-black/30'}
            style={{
                transform: `skewY(${skew}deg)`
            }}
        />
    );
}
