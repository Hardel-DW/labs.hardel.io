'use client';

import React from 'react';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import Image from 'next/image';

export default function FormDropzone(props: React.InputHTMLAttributes<HTMLInputElement>) {
    const { pending } = useFormStatus();

    return (
        <div className="flex items-center justify-center w-full">
            <label
                htmlFor={props.id}
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="w-8 h-8 mb-4">
                        <Image src="/icons/common/upload.svg" alt={'Upload'} width={32} height={32} className="w-full h-full" />
                    </div>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input {...props} disabled={pending} id="dropzone-file" type="file" className="hidden" />
            </label>
        </div>
    );
}
