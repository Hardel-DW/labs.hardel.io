'use client';
import Image from 'next/image';
import DefaultProject from '@images/design/item_placeholder.webp';
import { selectProject } from '@libs/request/client/project';
import { ReadableProjectData } from '@definitions/project';

export default function ProjectDropdownItem(props: { project: ReadableProjectData }) {
    const handleSelect = async () => await selectProject(props.project.id);

    return (
        <div className="py-3 px-4 w-full hover:bg-zinc-800 rounded-md cursor-pointer" onClick={() => handleSelect()}>
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <Image className="rounded-full" width={32} height={32} src={props.project.asset ?? DefaultProject} alt="user photo" />
                </div>
                <div className="pl-3">
                    <span className="block text-sm text-white">{props.project.name}</span>
                    <span className="block text-sm font-medium break-keep text-gray-500 truncate max-w-[12rem]">
                        {props.project.description}
                    </span>
                </div>
            </div>
        </div>
    );
}
