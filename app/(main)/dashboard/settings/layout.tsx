import React from 'react';
import SettingsLinks from '@main/dashboard/settings/SettingsLinks';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className={'min-height-view flex flex-col border-b-gold border-b-8 border-solid'}>
            <div className={'py-10 px-[150px] w-full'}>
                <div className={'mb-12'}>
                    <h1 className={'text-4xl font-bold text-white'}>Settings.</h1>
                    <hr />
                </div>
                <div className={'flex flex-1 relative'}>
                    <div className={'flex pr-4 py-4 flex-col font-semibold border-zinc-600 border-r gap-y-4 sticky top-16 w-[240px] mr-6'}>
                        <SettingsLinks href={'/dashboard/settings'}>General</SettingsLinks>
                        <SettingsLinks href={'/dashboard/settings/members'}>Members</SettingsLinks>
                        <SettingsLinks href={'/dashboard/settings/limit'}>Limitation</SettingsLinks>
                    </div>
                    <div className={'flex flex-col flex-1 ml-6'}>{children}</div>
                </div>
            </div>
        </section>
    );
}
