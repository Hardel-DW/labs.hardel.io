import React from 'react';
import { MONTHS } from '@/libs/constant';

export default function ActivitiesMonth(props: { month: number; years: number; children: React.ReactNode }) {
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
