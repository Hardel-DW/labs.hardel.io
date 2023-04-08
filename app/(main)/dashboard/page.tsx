import React, { Suspense } from 'react';
import Slash from '@icons/Slash';
import ProjectManager from '@main/dashboard/ProjectManager';
import ButtonProject from '@main/dashboard/ButtonProject';
import SearchProject from '@main/dashboard/SearchProject';
import LoadedProject from '@main/dashboard/LoadedProject';
import SearchContext from '@components/context/SearchContext';

export default function Dashboard() {
    return (
        <section className={'min-height-view flex flex-col border-b-gold border-b-8 border-solid'}>
            <div className={'py-10 px-[150px] w-full'}>
                <div className={'flex gap-x-4'}>
                    <h1 className={'text-4xl font-bold text-gold'}>Dashboard</h1>
                    <Slash />
                    <span className={'text-4xl font-bold text-zinc-200'}>Your projects</span>
                </div>
                <hr className={'mb-8'} />
                <SearchContext>
                    <div className={'flex mb-8'}>
                        <div className={'flex flex-auto'}>
                            <SearchProject />
                        </div>
                        <ButtonProject />
                    </div>
                    <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
                        <Suspense fallback={Array(5).fill(<LoadedProject />)}>
                            {/* @ts-expect-error Server Components */}
                            <ProjectManager />
                        </Suspense>
                    </div>
                </SearchContext>
            </div>
        </section>
    );
}
