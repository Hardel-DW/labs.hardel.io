'use client';

import React, { useContext, useEffect, useState } from 'react';
import FormLabel from '@/components/form/FormLabel';
import Image from 'next/image';
import ImagesPlaceholder from '@images/logo/placeholder.jpg';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import { FormCheckerContext } from '@/components/form/FormCheckerProvider';

type Props = {
    id: string;
};

export default function FormRoundedImage({ id }: Props) {
    const { pending } = useFormStatus();
    const { setKeyValue } = useContext(FormCheckerContext);
    const [file, setFile] = useState<File>();

    const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0]);
        setKeyValue(id, true);
    };

    useEffect(() => setKeyValue(id, false), [id, setKeyValue]);

    return (
        <FormLabel htmlFor={id}>
            <div className="cursor-pointer rounded-full w-20 h-20 ring-2 ring-gold shadow-zinc-800 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
                <Image
                    src={file ? URL.createObjectURL(file) : ImagesPlaceholder}
                    className="rounded-full w-full h-full object-cover"
                    width={80}
                    height={80}
                    alt={'Slash'}
                />
                <input disabled={pending} type="file" className="hidden" name={id} id={id} required accept="image/*" onChange={handle} />
            </div>
        </FormLabel>
    );
}
