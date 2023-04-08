import React, { Suspense } from 'react';
import Slash from '@icons/Slash';
import Checked from '@icons/mark/Checked';
import Unchecked from '@icons/mark/Unchecked';
import Info from '@icons/mark/Info';
import ActivityManager from '@main/dashboard/activity/ActivityManager';
import LoadingActivity from '@main/dashboard/activity/LoadingActivity';

export default function ActivityPage() {
    return (
        <section className={'min-height-view flex flex-col border-b-gold border-b-8 border-solid'}>
            <div className={'py-10 px-[150px] w-full'}>
                <div className={'flex gap-x-4'}>
                    <h1 className={'text-4xl font-bold text-gold'}>Dashboard</h1>
                    <Slash />
                    <span className={'text-4xl font-bold text-zinc-200'}>Activity</span>
                </div>
                <hr className={'mb'} />
                <div className={'8 flex justify-between items-center'}>
                    <div className={'bold text-xl text-zinc-400'}>Legend</div>
                    <div className={'flex gap-x-4'}>
                        <div className={'flex gap-x-2 items-center'}>
                            <Checked className={'w-4 h-4 fill-green-500'} />
                            <span>New feature</span>
                        </div>
                        <Slash />
                        <div className={'flex gap-x-2 items-center'}>
                            <Unchecked className={'w-4 h-4 fill-red-500'} />
                            <span>Removed feature</span>
                        </div>
                        <Slash />
                        <div className={'flex gap-x-2 items-center'}>
                            <Info className={'w-4 h-4 fill-blue-500'} />
                            <span>Changed feature or information</span>
                        </div>
                    </div>
                </div>
                <hr className={'mb-8'} />
                <Suspense fallback={<LoadingActivity />}>
                    {/* @ts-ignore */}
                    <ActivityManager />
                </Suspense>
            </div>
        </section>
    );
}
