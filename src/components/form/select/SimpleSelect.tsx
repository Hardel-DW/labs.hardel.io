'use client';

import React, { useContext, useEffect, useId, useMemo, useState } from 'react';
import useClickOutside from '@/libs/hooks/useClickOutside';
import { Option } from '@/components/form/select/SelectMultiple';
import Image from 'next/image';
import { FormCheckerContext } from '@/components/form/FormCheckerProvider';

type Props = {
    onChange?: (values: string | undefined) => void;
    defaultValue?: string;
    options: Option[];
};

export default function SimpleSelect(props: Props) {
    const [search, setSearch] = useState<string>('');
    const defaultOption = props.options.find((option) => option.value === props.defaultValue);
    const [selected, setSelected] = useState<Option>(defaultOption ?? props.options[0]);
    const [open, setOpen] = useState<boolean>(false);
    const ref = React.useRef<HTMLDivElement>(null);
    const { setKeyValue } = useContext(FormCheckerContext);
    const id = useId();
    useClickOutside(ref, () => setOpen(false));

    const displayedOptions = useMemo(() => {
        return props.options.filter((option) => option.name.toLowerCase().includes(search.toLowerCase())).splice(0, 20);
    }, [props.options, search]);

    const handleSet = (option: Option) => {
        setSelected(option);
        setOpen(false);
        setKeyValue?.(id, props.defaultValue !== option.value);

        props.onChange?.(option.value);
    };

    useEffect(() => {
        setKeyValue?.(id, false);
    }, [id, setKeyValue]);

    return (
        <div ref={ref} className={'relative w-full'}>
            <input type={'hidden'} value={selected?.value} name="version" id="version" />
            <div className={'border-2 border-solid border-white/20 rounded-md'} onClick={() => setOpen(!open)}>
                <div className={'flex items-center justify-between p-2'}>
                    <div className={'flex w-full'}>
                        {selected && (
                            <div className={'flex items-center justify-center bg-white/10 rounded-md px-2'}>
                                <span className={'text-white text-sm'}>{selected.shortName ?? selected.name}</span>
                            </div>
                        )}
                        <input
                            type={'text'}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={'Search...'}
                            className={'grow bg-transparent text-sm px-2 py-1 text-white focus:outline-none'}
                        />
                    </div>
                    <Image
                        src={'/icons/common/reveal.svg'}
                        alt={'reveal'}
                        className={'fill-white cursor-pointer w-4 h-4'}
                        height={16}
                        width={16}
                    />
                </div>
            </div>

            {open && displayedOptions.length > 0 && (
                <div
                    className={
                        'absolute w-full z-20 max-h-[200px] overflow-y-auto bg-zinc-900 border-2 mt-1 p-2 border-white/20 rounded-md'
                    }
                >
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
