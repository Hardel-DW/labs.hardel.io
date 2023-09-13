import Image from 'next/image';
import { ReadableProjectData } from '@/types/project';
import { clx, timeSince } from '@/libs/utils';
import Button from '@/components/form/Button';
import InvitationBadge from '@/components/badge/Invitation';
import Harion from '@images/logo/harion.webp';
import OptionCard from '@/app/dashboard/overview/OptionCard';
import { selectProject } from '@/server/project';

export default function ProjectCard({ project }: { project: ReadableProjectData }) {
    const timeAgp = timeSince(new Date(project?.updatedAt ?? project?.createdAt ?? new Date()));

    return (
        <div
            className={clx(
                'bg-black/50 border flex flex-col rounded-xl py-4 px-6 transition ease-in-out duration-300',
                project.session?.isSelected ? 'border-gold' : 'border-zinc-700 hover:border-white',
                project.session?.isInvited ? 'cursor-pointer' : ''
            )}
        >
            <div>
                <div className={'flex justify-between items-center'}>
                    <div className="flex items-center w-fit">
                        <div className="flex-shrink-0">
                            <Image className="rounded-full" width={32} height={32} src={project.asset ?? Harion} alt="user photo" />
                        </div>
                        <div className="pl-3">
                            <div className={'flex gap-x-2 items-center'}>
                                <span className="block text-lg font-semibold text-white break-word">{project.name}</span>
                                <span className="flex text-[0.75rem] items-center px-2 pt-[1px] h-fit rounded-xl text-white border border-zinc-700">
                                    {project.session?.role}
                                </span>
                            </div>
                            <span className="block text-sm font-medium break-keep text-gray-500 truncate max-w-[12rem]">
                                Version: {project.version}
                            </span>
                        </div>
                    </div>

                    {project.session?.isInvited ? <InvitationBadge /> : <OptionCard project={project} />}
                </div>
                <hr />
            </div>

            <div className={'flex-auto flex flex-col justify-between'}>
                <p className={'text-sm text-gray-500'}>{project.description}</p>
                <div className={'flex justify-between items-end text-sm text-gray-300'}>
                    <span>
                        {timeAgp.value} {timeAgp.name} ago
                    </span>
                    {!project.session?.isInvited && !project.session?.isSelected && (
                        <form action={selectProject}>
                            <input type="hidden" name="id" value={project.id} />
                            <Button toasts={{ text: 'Selecting project...' }} type="submit">
                                Select
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
