import React from 'react';
import { clx } from '@/libs/utils';
import Image from 'next/image';

export default function HardelLoader(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={clx(
                'animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gold flex justify-between items-center',
                props.className
            )}
        >
            <Image src={'/icons/hardel.svg'} alt={'logo'} className="w-full h-full" height={64} width={64} />
        </div>
    );
}
