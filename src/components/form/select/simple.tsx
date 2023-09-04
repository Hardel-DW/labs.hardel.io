'use client';

import React, { useEffect, useMemo, useState } from 'react';
import useClickOutside from '@libs/hooks/useClickOutside';
import Cross from '@icons/Common/Cross';
import ArrowBottom from '@icons/Common/ArrowBottom';
import { Option } from '@/components/form/Select/multiple';

type Props = {
    onChange?: (values: string | undefined) => void;
    values?: string;
    options: Option[];
};

export default function SimpleSelect(props: Props) {
    const [search, setSearch] = useState<string>('');
    const [selected, setSelected] = useState<Option>();
    const [open, setOpen] = useState<boolean>(false);
    const ref = React.useRef<HTMLDivElement>(null);
    useClickOutside(ref, () => setOpen(false));

    const displayedOptions = useMemo(() => {
        return props.options.filter((option) => option.name.toLowerCase().includes(search.toLowerCase())).splice(0, 20);
    }, [props.options, search]);

    const handleSet = (option: Option) => {
        setSelected(option);
        props.onChange?.(option.value);
    };

    const handleRemove = () => {
        setSelected(undefined);
        props.onChange?.(undefined);
    };

    useEffect(() => {
        setSelected(props.options.find((option) => option.value === props.values));
    }, [props.options, props.values]);

    return (
        <div ref={ref} className={'relative w-full'}>
            <div className={'border-2 border-solid border-white/20 rounded-md'} onClick={() => setOpen(true)}>
                <div className={'flex items-center justify-between p-2'}>
                    <div className={'flex'}>
                        <div className={'flex gap-x-1'}>
                            {selected && (
                                <div className={'flex items-center justify-center bg-white/10 rounded-md px-2'}>
                                    <span className={'text-white text-sm'}>{selected.shortName ?? selected.name}</span>
                                    <Cross className={'fill-white w-4 h-4 ml-2 cursor-pointer'} onClick={() => handleRemove()} />
                                </div>
                            )}
                        </div>
                        <input
                            type={'text'}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={'Search...'}
                            className={'bg-transparent w-full text-sm px-2 py-1 text-white focus:outline-none'}
                        />
                    </div>
                    <div className={'flex'}>
                        <Cross className={'fill-white cursor-pointer w-4 h-4'} onClick={() => handleRemove()} />
                        <div className={'mx-2 bg-gray-400 w-[1px]'} />
                        <ArrowBottom className={'fill-white cursor-pointer w-4 h-4'} />
                    </div>
                </div>
            </div>

            {open && displayedOptions.length > 0 && (
                <div className={'absolute w-full max-h-[200px] overflow-y-auto bg-zinc-900 border-2 mt-1 p-2 border-white/20 rounded-md'}>
                    <div className={'flex flex-col gap-y-1'}>
                        {displayedOptions.map((option, index) => (
                            <div
                                onClick={() => handleSet(option)}
                                key={index}
                                className={'px-2 py-1 rounded-md hover:bg-zinc-700 cursor-pointer'}
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
