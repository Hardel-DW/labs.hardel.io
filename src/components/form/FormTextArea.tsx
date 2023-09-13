'use client';

import React, { useContext, useEffect } from 'react';
import { clx } from '@/libs/utils';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import { FormCheckerContext } from '@/components/form/FormCheckerProvider';

export default function FormTextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { validate?: string }) {
    const { pending } = useFormStatus();
    const { setKeyValue } = useContext(FormCheckerContext);

    const handle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (props.id && props.validate) {
            setKeyValue(props.id, new RegExp(props.validate).test(e.target.value));
        }

        props.onChange?.(e);
    };

    useEffect(() => {
        if (props.id && props.validate) {
            setKeyValue(props.id, false);
        }
    }, [props.id, props.validate, setKeyValue]);

    return (
        <textarea
            {...props}
            disabled={pending}
            onChange={handle}
            className={clx(
                'bg-black/70 w-full text-sm border-2 border-solid border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-gold disabled:opacity-50 disabled:cursor-not-allowed',
                props.className
            )}
        ></textarea>
    );
}
