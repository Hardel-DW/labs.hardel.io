import Image from 'next/image';
import ActivityRepository from '@repositories/ActivityRepository';
import prisma from '@/libs/prisma';
import { getSession } from '@/libs/session';
import { MONTHS } from '@/libs/constant';
import React from 'react';
import { ReadableActivityData } from '@/types/project';
import { timeSince } from '@/libs/utils';
import { ActivityType } from '@prisma/client';
import Harion from 'public/images/logo/harion.webp';
import DashboardHeader from '@/components/layout/DashboardHeader';

const getActivities = async () => {
    const session = await getSession();
    if (!session?.project?.id) throw new Error('No project provided');
    return await new ActivityRepository(prisma.activity).getAll(session.project.id);
};

export default async function ActivityPage() {
    const activities = await getActivities();

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

            {activities.map((element, index) => (
                <ActivitiesMonth key={index} month={element.month} years={element.year}>
                    {element.data.map((month, index) => (
                        <ActivityDay key={index} day={month.day}>
                            {month.activities.map((activity, index) => (
                                <ActivityItem key={index} activity={activity}>
                                    {activity.message}
                                </ActivityItem>
                            ))}
                        </ActivityDay>
                    ))}
                </ActivitiesMonth>
            ))}
        </DashboardHeader>
    );
}

export function ActivitiesMonth(props: { month: number; years: number; children: React.ReactNode }) {
    return (
        <>
            <h2 className={'text-xl font-bold text-white'}>
                {MONTHS[props.month]} {props.years}
            </h2>
            <div className={'px-5'}>
                <ol className="relative border-l border-zinc-700">{props.children}</ol>
            </div>
        </>
    );
}

export function ActivityDay({ day, children }: { day: number; children: React.ReactNode }) {
    return (
        <li className="mb-10 ml-4">
            <div className="absolute w-3 h-3 rounded-full mt-1.5 -left-1.5 border-zinc-900 bg-zinc-700"></div>
            <div className={'mb-4'}>
                <time className="text-sm font-normal leading-none text-gray-500">
                    {day}
                    {day === 1 || day === 21 || day === 31 ? 'st' : day === 2 || day === 22 ? 'nd' : day === 3 || day === 23 ? 'rd' : 'th'}
                </time>
            </div>
            {children}
        </li>
    );
}

export function ActivityItem({ children, activity }: { children: string; activity: ReadableActivityData }) {
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
