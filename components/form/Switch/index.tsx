'use client';

import React, { useId } from 'react';

type Props = {
    onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
    disabled?: boolean;
    label?: string;
    isChecked?: boolean;
    defaultChecked?: boolean;
};

export default function Switch(props: Props) {
    const id = useId();

    return (
        <label htmlFor={id} className="inline-flex relative items-center cursor-pointer">
            <div className="relative flex items-center">
                <input
                    type="checkbox"
                    disabled={props.disabled}
                    defaultChecked={props.defaultChecked}
                    checked={props.isChecked}
                    className="sr-only peer"
                    id={id}
                    onClick={props.onClick}
                />
                <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#674c13] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                <span className="ml-3 text-sm font-bold">{props.label}</span>
            </div>
        </label>
    );
}
