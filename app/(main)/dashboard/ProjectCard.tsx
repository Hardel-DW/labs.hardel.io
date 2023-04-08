'use client';
import Image from 'next/image';
import Harion from '@images/logo/harion.webp';
import InvitationBadge from '@components/badge/Invitation';
import React, { useMemo } from 'react';
import { clx, timeSince } from '@libs/utils';
import { acceptProjectInvite, leaveProject, selectProject } from '@libs/request/client/project';
import SettingsOption from '@icons/Common/Option';
import WhiteButton from '@components/form/Button/White';
import useClickOutside from '@libs/hooks/useClickOutside';
import { ProjectRole } from '@prisma/client';
import AcceptationModal from '@components/modal/Accept';
import { useRouter } from 'next/navigation';
import { ReadableProjectData } from '@definitions/project';
import { Session } from 'next-auth';

type Props = {
    project: ReadableProjectData;
    session: Session;
};

export default function ProjectCard(props: Props) {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);
    useClickOutside(ref, () => setOpen(false));

    const handleClick = () => {
        if (props.project?.isInvited) {
            setModal(true);
        }
    };

    const handleSelect = async () => {
        await selectProject(props.project.id);
        router.refresh();
    };

    const handleAccept = async () => {
        await acceptProjectInvite(props.project.id).then(() => setModal(false));
        router.refresh();
    };

    const handleLeave = async () => {
        await leaveProject(props.project.id);
        router.refresh();
    };

    const timeAgp = timeSince(new Date(props.project?.updatedAt ?? props.project?.createdAt ?? new Date()));

    const isSelected = useMemo(() => {
        return props.project?.id === props.session?.project?.id;
    }, [props.project?.id, props.session?.project?.id]);

    return (
        <>
            <div
                className={clx(
                    'bg-black/50 border flex flex-col rounded-xl py-4 px-6 transition ease-in-out duration-300',
                    isSelected ? 'border-gold' : 'border-zinc-700 hover:border-white',
                    props.project.isInvited ? 'cursor-pointer' : ''
                )}
                onClick={() => handleClick()}
            >
                <div>
                    <div className={'flex justify-between items-center'}>
                        <div className="flex items-center w-fit">
                            <div className="flex-shrink-0">
                                <Image
                                    className="rounded-full"
                                    width={32}
                                    height={32}
                                    src={props.project.asset ?? Harion}
                                    alt="user photo"
                                />
                            </div>
                            <div className="pl-3">
                                <div className={'flex gap-x-2 items-center'}>
                                    <span className="block text-lg font-semibold text-white">{props.project.name}</span>
                                    <span className="block text-[0.75rem] flex items-center px-2 pt-[1px] h-fit rounded-xl text-white border border-zinc-700">
                                        {props.session.project?.role}
                                    </span>
                                </div>
                                <span className="block text-sm font-medium break-keep text-gray-500 truncate max-w-[12rem]">
                                    Version: {props.project.version}
                                </span>
                            </div>
                        </div>
                        {props.session.project?.isInvited ? (
                            <InvitationBadge />
                        ) : (
                            <div className={'relative'}>
                                <SettingsOption className={'w-6 h-6 cursor-pointer fill-white'} onClick={() => setOpen(!open)} />
                                {open && (
                                    <div
                                        ref={ref}
                                        className={
                                            'absolute -right-4 -top-5 bg-black border border-zinc-700 rounded-xl py-2 flex flex-col px-2 gap-y-2'
                                        }
                                    >
                                        <div onClick={() => handleSelect()} className={'px-4 cursor-pointer rounded-md hover:bg-zinc-800'}>
                                            Select
                                        </div>
                                        {props.session.project?.role !== ProjectRole.OWNER && (
                                            <div
                                                onClick={handleLeave}
                                                className={'px-4 cursor-pointer rounded-md hover:bg-zinc-800 text-red-500'}
                                            >
                                                Leaves
                                            </div>
                                        )}
                                        <div
                                            onClick={async () => await navigator.clipboard.writeText(JSON.stringify(props.project))}
                                            className={'px-4 cursor-pointer rounded-md hover:bg-zinc-800'}
                                        >
                                            Debug
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <hr />
                </div>
                <div className={'flex-auto flex flex-col justify-between'}>
                    <p className={'text-sm text-gray-500'}>{props.project.description}</p>
                    <div className={'flex justify-between items-end text-sm text-gray-300'}>
                        <span>
                            {timeAgp.value} {timeAgp.name} ago
                        </span>
                        {!props.session.project?.isInvited && !isSelected && <WhiteButton onClick={handleSelect}>Select</WhiteButton>}
                    </div>
                </div>
            </div>
            <AcceptationModal onReject={handleLeave} open={modal} onConfirm={handleAccept} onClose={() => setModal(false)}>
                Do you want accept this invitation ?
            </AcceptationModal>
        </>
    );
}
