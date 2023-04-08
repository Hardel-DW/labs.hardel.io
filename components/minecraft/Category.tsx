'use client';

import { ReadableCategoryData } from '@definitions/minecraft';
import Image from 'next/image';

type Props = {
    category: ReadableCategoryData;
    selected: string | undefined;
    onClick: () => void;
};

export default function Category(props: Props) {
    return (
        <span
            className={
                'block border-y border-l relative rounded-tl-xl rounded-bl-xl mb-[2px] align-middle w-12 h-12 p-[8px] cursor-pointer' +
                (props.category.id === props.selected
                    ? ' bg-black/20 opacity-100 border-white/20'
                    : ' bg-black opacity-10 border-zinc-500 hover:opacity-70 hover:bg-zinc-800')
            }
            onClick={props.onClick}
        >
            <span className={'absolute top-0 bottom-0 right-[-1px] w-[1px] bg-zinc-800'} />
            <Image alt={''} src={props.category.asset} height={64} width={64} className={'w-full h-full pixelated'} />
        </span>
    );
}
