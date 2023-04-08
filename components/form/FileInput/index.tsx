'use client';

import React, { useEffect, useId } from 'react';

type Props = {
    onChange?: (file: File) => void;
    value?: File;
};

export default function FileInput(props: Props) {
    const id = useId();
    const [file, setFile] = React.useState<File>();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            props.onChange?.(file);
        }
    };

    useEffect(() => {
        setFile(props.value);
    }, [props.value]);

    return (
        <div className="bg-transparent rounded-md w-full border-2 border-solid border-white/20 flex p-1 items-center">
            <label className="text-sm font-medium text-white" htmlFor={id}>
                <div className="rounded-md bg-zinc-700 px-4 py-2 transition-[background] cursor-pointer px-4 hover:bg-zinc-500">
                    Upload File
                </div>
                <input id={id} type={'file'} className="hidden" onChange={handleFileChange} accept={'.png,.jpg,.jpeg,.gif,.webp'} />
            </label>
            <div className={'flex-auto text-sm text-gray-400 pl-4'}>{file ? file.name : 'No file Selected'}</div>
        </div>
    );
}
