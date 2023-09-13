'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function FormCopy(props: { children: string; onCopy?: () => void }) {
    const [pending, setPending] = useState<boolean>(false);

    const copy = async () => {
        setPending(true);
        await navigator.clipboard.writeText(props.children).then(() => props.onCopy?.());
    };

    useEffect(() => {
        if (pending) {
            setTimeout(() => setPending(false), 3000);
        }
    }, [pending]);

    return (
        <div className={'w-full rounded-md border border-zinc-600 relative'}>
            <div className={'px-4 py-2 pr-[50px]'}>{props.children}</div>
            <div className={'absolute top-0 right-0 bottom-0 flex items-center px-2'}>
                {pending ? (
                    <Image alt="checked" src={'/icons/common/checked.svg'} width={24} height={24} priority />
                ) : (
                    <Image
                        alt={'Copy'}
                        priority
                        height={24}
                        width={24}
                        src={'/icons/common/copy.svg'}
                        className={'cursor-pointer fill-zinc-400 h-6 w-6 hover:fill-white transition'}
                        onClick={() => copy()}
                    />
                )}
            </div>
        </div>
    );
}
