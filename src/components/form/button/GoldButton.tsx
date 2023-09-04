import React from 'react';
import { clx } from '@/libs/utils';

export default function GoldButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={clx(
                'px-8 hover:scale-90 transition-transform py-2 rounded-md bg-gold text-white font-semibold border-gray-600 border',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                props.className
            )}
        />
    );
}
