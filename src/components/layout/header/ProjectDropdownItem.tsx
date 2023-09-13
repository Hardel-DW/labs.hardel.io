import Image from 'next/image';
import { ReadableProjectData } from '@/types/project';
import DefaultProject from '@images/logo/harion.webp';
import { clx } from '@/libs/utils';
import { selectProject } from '@/server/project';

export default function ProjectDropdownItem(props: { project: ReadableProjectData }) {
    return (
        <form action={selectProject}>
            <input type="hidden" name="id" value={props.project.id} />
            <button type="submit" className={clx('py-3 px-4 w-full hover:bg-zinc-800 rounded-md cursor-pointer')}>
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <Image
                            className="rounded-full"
                            width={32}
                            height={32}
                            src={props.project.asset ?? DefaultProject}
                            alt="user photo"
                        />
                    </div>
                    <div className="pl-3">
                        <span className="block text-sm text-white text-left">{props.project.name}</span>
                        <span className="block text-sm font-medium break-keep text-gray-500 truncate max-w-[12rem]">
                            {props.project.description}
                        </span>
                    </div>
                </div>
            </button>
        </form>
    );
}
