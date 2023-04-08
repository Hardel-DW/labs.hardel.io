import React from 'react';
import Sidebar from '@main/generator/(Sidebar)/Sidebar';
import ProjectContextProvider from '@main/generator/ProjectContext';
import ToastContainer from '@components/toast/ToastContainer';
import TooltipContextProvider from '@components/minecraft/ItemTooltip/TooltipContext';
import DrawerContextProvider from '@main/generator/crafting/(component)/DrawerContext';
import ItemTooltip from '@components/minecraft/ItemTooltip';
import DrawerManager from '@main/generator/crafting/(component)/DrawerManager';
import { getSession, preloadCraftData } from '@libs/session';

export default async function GeneratorLayout({ children }: { children: React.ReactNode }) {
    getSession().then((session) => session?.project?.id && preloadCraftData(session.project.id));

    return (
        <ToastContainer>
            <ProjectContextProvider>
                <TooltipContextProvider>
                    <DrawerContextProvider>
                        <div className={'flex relative'}>
                            <Sidebar />
                            <div className={'w-full relative overflow-hidden'}>
                                <div className={'border-gold border-t'}>{children}</div>
                            </div>
                        </div>
                        <ItemTooltip />
                        <DrawerManager />
                    </DrawerContextProvider>
                </TooltipContextProvider>
            </ProjectContextProvider>
        </ToastContainer>
    );
}
