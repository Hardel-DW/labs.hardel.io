'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ButtonCopy(props: { snippet: string }) {
    const [pending, setPending] = useState<boolean>(false);

    const copy = async () => {
        setPending(true);
        await navigator.clipboard.writeText(props.snippet);
    };

    useEffect(() => {
        if (pending) {
            setTimeout(() => setPending(false), 3000);
        }
    }, [pending]);

    return (
        <div
            className={
                'w-12 h-12 p-2 hover:bg-black/30 cursor-pointer transition bg-black/10 border border-white/20 rounded-md flex justify-center items-center'
            }
        >
            {pending ? (
                <Image alt="checked" src={'/icons/common/checked.svg'} width={24} height={24} priority />
            ) : (
                <Image onClick={() => copy()} alt="copy" src={'/icons/common/copy.svg'} width={24} height={24} priority />
            )}
        </div>
    );
}
