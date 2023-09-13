'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ButtonDownload(props: { snippet: string }) {
    const [pending, setPending] = useState<boolean>(false);

    const download = () => {
        const element = document.createElement('a');
        const file = new Blob([props.snippet], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'snippet.json';
        document.body.appendChild(element);
        element.click();
        setPending(true);
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
                <Image onClick={() => download()} alt="download" src={'/icons/common/download.svg'} width={24} height={24} priority />
            )}
        </div>
    );
}
