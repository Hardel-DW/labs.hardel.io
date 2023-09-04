import React from 'react';
import Image from 'next/image';

export default function Check(props: { children: React.ReactNode }) {
    return (
        <div className={'flex items-center gap-x-4'}>
            <div className={'h-6 w-6'}>
                <Image priority src={'/icons/common/checked.svg'} alt={'icons'} height={32} width={32} />
            </div>
            <span className={'text-start'}>{props.children}</span>
        </div>
    );
}
