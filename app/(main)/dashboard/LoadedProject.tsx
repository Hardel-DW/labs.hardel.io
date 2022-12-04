import React from 'react';

export default function LoadedProject() {
    return (
        <div className={'bg-black/50 flex flex-col rounded-xl py-4 px-6 border border-zinc-700 hover:border-white transition ease-in-out duration-300'}>
            <div>
                <div className={'flex items-center'}>
                    <div className="flex-shrink-0">
                        <div className={'w-8 h-8 rounded-full animate-pulse bg-zinc-700'} />
                    </div>
                    <div className="pl-3 flex flex-col gap-y-1">
                        <span className="block bg-zinc-700 animate-pulse rounded-full w-[150px] h-4" />
                        <span className="block bg-zinc-700 animate-pulse rounded-full w-[150px] h-4" />
                    </div>
                </div>
            </div>
            <hr />
            <div className={'flex-auto flex flex-col gap-y-4 justify-between'}>
                <div className={'w-full h-12 rounded animate-pulse bg-zinc-700'} />
                <div className={'flex justify-between items-end text-sm text-gray-300'}>
                    <div className={'w-16 h-4 rounded animate-pulse bg-zinc-700'} />
                </div>
            </div>
        </div>
    );
}
