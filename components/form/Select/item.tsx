'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useClickOutside from '@libs/hooks/useClickOutside';
import Cross from '@icons/Common/Cross';
import ArrowBottom from '@icons/Common/ArrowBottom';
import useSWR from 'swr';
import fetcher from '@libs/request/fetcher';
import { ReadableItemData } from '@definitions/minecraft';
import Image from 'next/image';
import { RingLoader } from 'react-spinners';
import { clx, toNamespace } from '@libs/utils';

type Props = {
    onChange?: (itemId: ReadableItemData | string | undefined) => void;

    /**
     * The minecraft id of the item
     */
    value?: string;
    customValue?: boolean;
};

export default function SelectItem(props: Props) {
    const { data: items } = useSWR<ReadableItemData[]>('/api/items/lite', fetcher);
    const [search, setSearch] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<ReadableItemData | string>();
    const ref = React.useRef<HTMLDivElement>(null);

    useClickOutside(ref, () => {
        if (search.length > 0 && !selected) {
            handleSet(search);
        }
        setOpen(false);
    });

    const displayedOptions = useMemo(() => {
        return items?.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())).splice(0, 20);
    }, [items, search]);

    const handleSet = useCallback(
        (option: ReadableItemData | string) => {
            const minecraftId = typeof option === 'string' ? option : option.minecraftId;
            const item = items?.find((item) => item.minecraftId === toNamespace(minecraftId));
            if (!props.customValue && !item) {
                return;
            }

            setSelected(option);
            props.onChange?.(option);
            setSearch('');
        },
        [items, props]
    );

    const handleRemove = () => {
        setSelected(undefined);
        props.onChange?.(undefined);
    };

    useEffect(() => {
        const item = items?.find((item) => item.minecraftId === toNamespace(props.value));
        if (!props.customValue && !item) {
            return;
        }

        const value = item ? item : toNamespace(props.value);
        setSelected(value);
    }, [items, props.customValue, props.value]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && search.length > 0) {
                handleSet(search);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [displayedOptions, handleSet, search]);

    return (
        <div ref={ref} className={'relative w-full'}>
            <div
                className={clx('border-2 border-solid rounded-md', open ? 'border-gold' : 'border-white/20')}
                onClick={() => setOpen(true)}
            >
                <div className={'flex items-center justify-between p-2'}>
                    {selected && (
                        <div className={'flex items-center gap-x-2 bg-white/10 rounded-md px-2 py-1'}>
                            {!(typeof selected === 'string') ? (
                                <>
                                    <div className={'w-6 h-6'}>
                                        <Image
                                            src={selected.asset}
                                            className={'h-full w-full pixelated mr-2'}
                                            width={64}
                                            height={64}
                                            alt={''}
                                        />
                                    </div>
                                    <div className={'flex flex-col'}>
                                        <span className={'text-white text-sm'}>{selected.name}</span>
                                        <span className={'text-zinc-400 text-sm mt-[2px]'}>{selected.minecraftId}</span>
                                    </div>
                                </>
                            ) : (
                                <span className={'text-white text-sm'}>{selected}</span>
                            )}
                        </div>
                    )}

                    {!items && (
                        <div className={'flex items-center gap-x-2 bg-white/10 rounded-md px-2 py-1'}>
                            <RingLoader color={'#fff'} size={16} />
                        </div>
                    )}

                    <input
                        type={'text'}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={'Search an item or enter a id'}
                        className={'flex flex-auto bg-transparent text-sm px-2 py-1 text-white focus:outline-none'}
                    />
                    <div className={'flex'}>
                        <Cross className={'fill-white cursor-pointer w-4 h-4'} onClick={() => handleRemove()} />
                        <div className={'mx-2 bg-gray-400 w-[1px]'} />
                        <ArrowBottom className={'fill-white cursor-pointer w-4 h-4'} />
                    </div>
                </div>
            </div>

            {open && displayedOptions && displayedOptions.length > 0 && (
                <div
                    className={
                        'absolute z-10 w-full max-h-[200px] overflow-y-auto bg-zinc-900 border-2 mt-1 p-2 border-white/20 rounded-md'
                    }
                >
                    <div className={'flex flex-col gap-y-1'}>
                        {displayedOptions.map((option, index) => (
                            <div
                                onClick={() => handleSet(option)}
                                key={index}
                                className={
                                    'px-2 py-1 justify-between flex rounded-md outline outline-0 outline-offset-2 outline-zinc-500 hover:outline-2 cursor-pointer'
                                }
                            >
                                <div className={'flex items-center gap-x-4'}>
                                    <Image src={option.asset} className={'w-6 h-6 pixelated'} width={64} height={64} alt={''} />
                                    <span className={'text-white text-sm'}>
                                        {search.length > 0 ? (
                                            <>
                                                <span className={'text-zinc-400'}>
                                                    {option.name.substring(0, option.name.toLowerCase().indexOf(search.toLowerCase()))}
                                                </span>
                                                <span className={'text-white'}>
                                                    {option.name.substring(
                                                        option.name.toLowerCase().indexOf(search.toLowerCase()),
                                                        option.name.toLowerCase().indexOf(search.toLowerCase()) + search.length
                                                    )}
                                                </span>
                                                <span className={'text-zinc-400'}>
                                                    {option.name.substring(
                                                        option.name.toLowerCase().indexOf(search.toLowerCase()) + search.length,
                                                        option.name.length
                                                    )}
                                                </span>
                                            </>
                                        ) : (
                                            option.name
                                        )}
                                    </span>
                                </div>
                                <span className={'text-zinc-500 text-sm'}>{option.minecraftId}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
