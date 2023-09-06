'use client';
import { useMemo, useRef, useState } from 'react';
import { Session } from 'next-auth';
import Image from 'next/image';

import DefaultProject from '@images/design/item_placeholder.webp';
import { clx } from '@/libs/utils';
import UseClickOutside from '@/libs/hooks/useClickOutside';
import DashboardLink from '@/components/layout/header/DashboardLink';
import ProjectDropdownItem from '@/components/layout/header/ProjectDropdownItem';
import FormInput from '@/components/form/FileInput';
import { ReadableProjectData } from '@/types/project';

type Props = {
    projects: ReadableProjectData[];
    session: Session | null;
};

export default function SelectedProject({ projects, session }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    UseClickOutside(ref, () => setIsOpen(false));

    const displayedProject = useMemo(() => {
        return (
            projects
                ?.filter((project) => project.id !== session?.project?.id)
                .filter((project) => project.name.toLowerCase().includes(search.toLowerCase()))
                .slice(0, 5) ?? []
        );
    }, [projects, search, session?.project?.id]);

    return (
        <>
            <div className={'flex gap-x-2 h-[40px] items-center cursor-pointer'} onClick={() => setIsOpen(true)}>
                <Image
                    className={'h-[40px] w-[40px] rounded-md'}
                    src={session?.project?.asset ?? DefaultProject}
                    alt={'Project icon'}
                    width={32}
                    height={32}
                />
                <span className={'text-zinc-300 text-lg font-bold ml-2'}>{session?.project?.name ?? 'No project selected'}</span>
                <Image src="/icons/common/expand.svg" className="h-[25px] fill-zinc-300 mt-[3px]" alt="Reveal" width={25} height={25} />
            </div>
            <Image src="/icons/slash.svg" alt="Slash" height={40} width={40} />
            <div className={'flex gap-x-2'}>
                <DashboardLink href={'/dashboard'}>Overview</DashboardLink>
                {session?.project?.id && (
                    <>
                        <DashboardLink href={'/dashboard/teams'}>Teams</DashboardLink>
                        <DashboardLink href={'/dashboard/activity'}>Activity</DashboardLink>
                        <DashboardLink href={'/dashboard/settings'}>Settings</DashboardLink>
                    </>
                )}
            </div>

            {isOpen && (
                <div
                    ref={ref}
                    className={clx(
                        'bg-black/90 border border-zinc-700 absolute top-[72px] left-[120px] z-[100] text-base list-none rounded-xl',
                        isOpen ? 'block' : 'hidden'
                    )}
                >
                    <div className={'p-4'}>
                        <FormInput placeholder={'Search for a project'} value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    {displayedProject.length > 0 &&
                        displayedProject.map((project) => {
                            return <ProjectDropdownItem key={project.id} project={project} />;
                        })}
                </div>
            )}
        </>
    );
}
