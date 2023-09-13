'use client';

import Image from 'next/image';
import { ProjectRole } from '@prisma/client';
import { useRef, useState } from 'react';
import UseClickOutside from '@/libs/hooks/useClickOutside';
import Link from 'next/link';
import { ReadableProjectData } from '@/types/project';
import { leaveProject } from '@/server/project';

export default function OptionCard({ project }: { project: ReadableProjectData }) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    UseClickOutside(ref, () => setOpen(false));

    return (
        <div className={'relative'}>
            <div className={'w-6 h-6 cursor-pointer fill-white'} onClick={() => setOpen(!open)}>
                <Image className={'w-full h-full'} src="/icons/common/option.svg" width={24} height={24} alt="settings" />
            </div>
            {open && (
                <div
                    ref={ref}
                    className={'absolute -right-4 -top-5 bg-black border border-zinc-700 rounded-xl py-2 flex flex-col px-2 gap-y-2'}
                >
                    {project.session?.role === ProjectRole.OWNER && (
                        <form action={leaveProject}>
                            <input type="hidden" name="id" value={project.id} />
                            <button type="submit" className={'px-4 cursor-pointer rounded-md hover:bg-zinc-800 text-red-500'}>
                                Leaves
                            </button>
                        </form>
                    )}
                    <Link href={'/data/project/' + project.id}>
                        <div className={'px-4 cursor-pointer rounded-md hover:bg-zinc-800'}>Data</div>
                    </Link>
                </div>
            )}
        </div>
    );
}
