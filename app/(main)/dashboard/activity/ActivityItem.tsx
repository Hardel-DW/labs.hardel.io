import React, { useMemo } from 'react';
import Image from 'next/image';
import Harion from '@images/logo/harion.webp';
import { clx, timeSince } from '@libs/utils';
import ArrowBottom from '@icons/Common/ArrowBottom';
import Checked from '@icons/mark/Checked';
import Unchecked from '@icons/mark/Unchecked';
import Info from '@icons/mark/Info';
import { ActivityType } from '@prisma/client';
import { ReadableActivityData } from '@definitions/project';

export default function ActivityItem(props: { children: string; data: ReadableActivityData; className?: string }) {
    const timeAgo = timeSince(new Date(props.data?.createdAt ?? 0));

    const message = useMemo(() => {
        const currentText = props.children;
        const user = props.data.createdBy?.accountData?.name;
        return user ? currentText.replace(/%user%/g, user) : currentText;
    }, [props.children, props.data.createdBy?.accountData?.name]);

    return (
        <div
            className={
                'flex justify-between items-center mb-2 py-1 px-4 hover:outline outline-gold transition ease-in-out duration-200 rounded-xl'
            }
        >
            <div className={'flex items-center gap-x-4'}>
                <Image
                    className={'w-4 h-4 rounded-full'}
                    src={props.data.createdBy?.accountData?.avatar ?? Harion}
                    alt={'Harion'}
                    width={40}
                    height={40}
                />
                <p className={clx('mb-0 text-base font-normal text-zinc-400', props.className)}>{message}</p>
            </div>
            <div className={'flex items-center gap-x-4'}>
                <ArrowBottom className={'fill-zinc-500 h-4 w-4'} />
                <p className="mb-0 text-base font-normal text-zinc-500">
                    {timeAgo.value}
                    {timeAgo.suffix}
                </p>
                {props.data.action === ActivityType.CREATE && <Checked className={'w-4 h-4 fill-green-500'} />}
                {props.data.action === ActivityType.DELETE && <Unchecked className={'w-4 h-4 fill-red-500'} />}
                {props.data.action === ActivityType.INFO && <Info className={'w-4 h-4 fill-blue-500'} />}
            </div>
        </div>
    );
}
