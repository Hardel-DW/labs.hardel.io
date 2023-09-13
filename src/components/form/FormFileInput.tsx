'use client';

import React, { useContext, useEffect } from 'react';
import { clx } from '@/libs/utils';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import FormLabel from '@/components/form/FormLabel';
import Image from 'next/image';
import { FormCheckerContext } from '@/components/form/FormCheckerProvider';

/**
 *
 * <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
 * <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">
 * @param props
 * @constructor
 */

export default function FormFileInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
    const { pending } = useFormStatus();
    const [file, setFile] = React.useState<File>();
    const { setKeyValue } = useContext(FormCheckerContext);

    useEffect(() => {
        if (props.id) {
            setKeyValue?.(props.id, false);
        }
    }, [props.id, setKeyValue]);

    const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0]);
        if (props.id) {
            setKeyValue?.(props.id, true);
        }

        props.onChange?.(e);
    };

    return (
        <>
            <div className="flex justify-between items-center">
                <FormLabel htmlFor={props.id}>Upload file</FormLabel>
                {file ? <Image className="rounded-xl p-2" src={URL.createObjectURL(file)} alt={'file'} height={60} width={60} /> : null}
            </div>
            <input
                {...props}
                type="file"
                onChange={handle}
                disabled={pending}
                className={clx(
                    'bg-black/70 w-full text-sm border-2 border-solid border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-gold disabled:opacity-50 disabled:cursor-not-allowed',
                    props.className
                )}
            />
        </>
    );
}
