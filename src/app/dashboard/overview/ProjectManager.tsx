'use client';
import Button from '@/components/form/Button';
import { ReadableProjectData } from '@/types/project';
import FormInput from '@/components/form/FormInput';
import { useMemo, useState } from 'react';
import ProjectCard from '@/app/dashboard/overview/ProjectCard';
import Link from 'next/link';

export default function ProjectManager({ projects }: { projects: ReadableProjectData[] }) {
    const [search, setSearch] = useState<string>('');
    const display = useMemo(() => {
        return projects?.filter((project) => project.name.toLowerCase().includes(search.toLowerCase()));
    }, [projects, search]);

    return (
        <div>
            <div className={'flex mb-8 md:flex-row flex-col gap-y-4'}>
                <div className={'flex flex-auto flex-col'}>
                    <FormInput type={'text'} placeholder="Search a project" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <Link href={'/dashboard/project/new'}>
                    <Button className={'md:ml-4 w-full'}>New project</Button>
                </Link>
            </div>
            {display?.length === 0 && (
                <div className={'mt-40 flex flex-col items-center justify-center'}>
                    <span className={'text-2xl font-bold text-gold'}>No projects found</span>
                    <span className={'text-xl text-zinc-200'}>Try to create a new one</span>
                </div>
            )}
            <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
                {display?.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
}
