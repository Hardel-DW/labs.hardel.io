import { ReadableActivityData } from '@/types/project';
import { timeSince } from '@/libs/utils';
import Image from 'next/image';
import Harion from '@images/logo/harion.webp';
import { ActivityType } from '@prisma/client';
import React from 'react';

export default function ActivityItem({ children, activity }: { children: string; activity: ReadableActivityData }) {
    const timeAgo = timeSince(new Date(activity?.createdAt ?? 0));

    return (
        <div
            className={
                'flex justify-between items-center mb-2 py-1 px-4 hover:outline outline-gold transition ease-in-out duration-200 rounded-xl'
            }
        >
            <div className={'flex items-center gap-x-4'}>
                <Image className={'w-4 h-4 rounded-full'} src={activity.createdBy?.image ?? Harion} alt={'Harion'} width={40} height={40} />
                <p className={'mb-0 text-base font-normal text-zinc-400'}>
                    {activity.createdBy?.name ? children.replace(/%user%/g, activity.createdBy?.name) : children}
                </p>
            </div>
            <div className={'flex items-center gap-x-4'}>
                <div className="w-4 h-4">
                    <Image src="/icons/common/reveal.svg" className="h-full w-full" width={32} height={32} alt={'reveal'} />
                </div>

                <p className="mb-0 text-base font-normal text-zinc-500">
                    {timeAgo.value}
                    {timeAgo.suffix}
                </p>
                <div className={'w-4 h-4'}>
                    {activity.action === ActivityType.CREATE && (
                        <Image src="/icons/common/checked.svg" className="h-full w-full" width={32} height={32} alt={'check'} />
                    )}
                    {activity.action === ActivityType.DELETE && (
                        <Image src="/icons/common/unchecked.svg" className="h-full w-full" width={32} height={32} alt={'check'} />
                    )}
                    {activity.action === ActivityType.INFO && (
                        <Image src="/icons/common/info.svg" className="h-full w-full" width={32} height={32} alt={'check'} />
                    )}
                </div>
            </div>
        </div>
    );
}
