import React from 'react';

export default function ActivityDay({ day, children }: { day: number; children: React.ReactNode }) {
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
