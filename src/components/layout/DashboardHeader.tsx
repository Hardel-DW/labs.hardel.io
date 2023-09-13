import Image from 'next/image';
import React from 'react';

export default function DashboardHeader({ children, name }: { children: React.ReactNode; name: string }) {
    return (
        <section className={'py-10 w-11/12 mx-auto'}>
            <div className={'flex flex-col md:flex-row'}>
                <h1 className={'text-4xl font-bold text-gold mb-0'}>Dashboard</h1>
                <div className={'h-full hidden md:block'}>
                    <Image src="/icons/slash.svg" className="h-full w-full" width={32} height={32} alt={'Slash'} />
                </div>
                <span className={'text-4xl text-zinc-200'}>{name}</span>
            </div>

            {children}
        </section>
    );
}
