import DashboardHeader from '@/components/layout/DashboardHeader';
import Image from 'next/image';
import React from 'react';

export default function LoadedProject() {
    return (
        <DashboardHeader name={'Activities'}>
            <div className={'flex justify-between items-center mt-4'}>
                <div className={'bold text-xl text-zinc-400'}>Legend</div>
                <div className={'flex gap-x-4'}>
                    <div className="flex gap-x-2 items-center">
                        <div className={'w-4 h-4'}>
                            <Image src="/icons/common/checked.svg" className="h-full w-full" width={32} height={32} alt={'check'} />
                        </div>
                        <span>New feature</span>
                    </div>
                    <div className="flex gap-x-2 items-center">
                        <div className={'w-4 h-4'}>
                            <Image src="/icons/slash.svg" className="h-full w-full" width={32} height={32} alt={'Slash'} />
                        </div>
                        <div className={'w-4 h-4'}>
                            <Image src="/icons/common/unchecked.svg" className="h-full w-full" width={32} height={32} alt={'check'} />
                        </div>
                        <span>Removed feature</span>
                    </div>
                    <div className="flex gap-x-2 items-center">
                        <div className={'w-4 h-4'}>
                            <Image src="/icons/slash.svg" className="h-full w-full" width={32} height={32} alt={'Slash'} />
                        </div>
                        <div className={'w-4 h-4'}>
                            <Image src="/icons/common/info.svg" className="h-full w-full" width={32} height={32} alt={'check'} />
                        </div>
                        <span>Changed feature or information</span>
                    </div>
                </div>
            </div>
            <hr className={'mb-8'} />

            <div className={'px-5'}>
                <ol className="relative border-l border-zinc-700">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <LoadingDay key={i}>
                            {Array.from({ length: 5 }).map((_, y) => (
                                <LoadingItem key={y} />
                            ))}
                        </LoadingDay>
                    ))}
                </ol>
            </div>

            <div className={'animate-pulse mb-4 h-6 w-32 bg-zinc-700 rounded'} />
            <div className={'px-5'}>
                <ol className="relative border-l border-zinc-700">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <LoadingDay key={i}>
                            {Array.from({ length: 5 }).map((_, y) => (
                                <LoadingItem key={y} />
                            ))}
                        </LoadingDay>
                    ))}
                </ol>
            </div>
        </DashboardHeader>
    );
}

function LoadingDay(props: { children: React.ReactNode }) {
    return (
        <li className="mb-10 ml-4">
            <div className="absolute w-3 h-3 rounded-full my-1.5 -left-1.5 border-zinc-900 bg-zinc-700"></div>
            <div className={'mb-4'}>
                <time className="text-sm font-normal leading-none text-gray-500">Loading...</time>
            </div>
            {props.children}
        </li>
    );
}

function LoadingItem() {
    return (
        <div className={'flex justify-between items-center mb-2 py-1 px-4'}>
            <div className={'flex items-center gap-x-4'}>
                <div className={'w-4 h-4 rounded-full bg-zinc-700 animate-pulse'} />
                <div className={'h-4 w-32 bg-zinc-700 rounded animate-pulse'} />
            </div>
            <div className={'flex items-center gap-x-4'}>
                <div className={'w-4 h-4 animate-pulse rounded-full bg-zinc-700'} />
                <div className={'h-4 w-32 bg-zinc-700 rounded animate-pulse'} />
            </div>
        </div>
    );
}
