'use client';

import React, { useEffect, useState } from 'react';
import useClickOutside from '@/libs/hooks/useClickOutside';
import { Option } from '@/components/form/select/SelectMultiple';
import Image from 'next/image';

type Props = {
    onChange?: (values: string | undefined) => void;
    defaultValue?: string;
    options: Option[];
};

export default function SmallSelect(props: Props) {
    const [selected, setSelected] = useState<Option>(props.options[0]);
    const [open, setOpen] = useState<boolean>(false);
    const ref = React.useRef<HTMLDivElement>(null);
    useClickOutside(ref, () => setOpen(false));

    const handleSet = (option: Option) => {
        setSelected(option);
        props.onChange?.(option.value);
    };

    useEffect(() => {
        setSelected(props.options.find((option) => option.value === props.defaultValue) || props.options[0]);
    }, [props.options, props.defaultValue]);

    return (
        <div ref={ref} className={'relative w-full'}>
            <div className={'border-2 border-solid border-white/20 rounded-md'} onClick={() => setOpen(!open)}>
                <div className={'flex items-center justify-between p-2'}>
                    <div className={'flex'}>
                        <div className={'flex gap-x-1'}>
                            {selected && (
                                <div className={'flex items-center justify-center px-2 py-[2px] select-none'}>
                                    <span className={'text-white text-sm'}>{selected.shortName ?? selected.name}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={'flex'}>
                        <div className={'mx-2 bg-gray-400 w-[1px]'} />
                        <Image
                            src="/icons/common/reveal.svg"
                            alt="reveal"
                            className="fill-white cursor-pointer w-4 h-4"
                            height={16}
                            width={16}
                        />
                    </div>
                </div>
            </div>

            {open && (
                <div
                    className={
                        'absolute z-10 w-full max-h-[200px] overflow-y-auto bg-zinc-900 border-2 mt-1 p-2 border-white/20 rounded-md'
                    }
                >
                    <div className={'flex flex-col gap-y-1'}>
                        {props.options.map((option, index) => (
                            <div
                                onClick={() => handleSet(option)}
                                key={index}
                                className={'px-2 py-1 rounded-md hover:bg-zinc-700 select-none cursor-pointer'}
                            >
                                {option.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
