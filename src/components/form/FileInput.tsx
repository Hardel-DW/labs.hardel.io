import React from 'react';

export default function FormInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={`bg-transparent w-full text-sm border-2 border-solid border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-gold ${props.className}`}
        />
    );
}
