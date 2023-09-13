import React from 'react';
import { clx } from '@/libs/utils';

export default function FormLabel(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
    return (
        <label {...props} className={clx('text-lg font-bold tracking-wider uppercase text-white', props.className)}>
            {props.children}
        </label>
    );
}
