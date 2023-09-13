import Image from 'next/image';
import ActivityRepository from '@repositories/ActivityRepository';
import prisma from '@/libs/prisma';
import { getSession } from '@/libs/session';
import React from 'react';
import DashboardHeader from '@/components/layout/DashboardHeader';
import ActivitiesMonth from '@/app/dashboard/activity/ActivitiesMonth';
import ActivityDay from '@/app/dashboard/activity/ActivityDay';
import ActivityItem from '@/app/dashboard/activity/ActivityItem';

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
