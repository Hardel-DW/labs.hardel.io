import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Harion from '@images/logo/harion.webp';
import GoldButton from '@components/form/Button/Gold';
import Search from '@icons/Common/Search';

function ProjectLink(props: { name: string; picture: string | StaticImageData }) {
    return (
        <div className="w-full text-white font-medium opacity-70 hover:opacity-100 cursor-pointer transition">
            <div className="flex items-center justify-start w-fit">
                <div className="flex-shrink-0 h-5 w-5">
                    <Image className="rounded-full" width={32} height={32} src={props.picture} alt="user photo" />
                </div>
                <div className="pl-3">
                    <span className="block text-sm">{props.name}</span>
                </div>
            </div>
        </div>
    );
}

export default function SidebarProject() {
    const [search, setSearch] = useState('');

    return (
        <>
            <div className="py-3 px-4 w-max border-gold/50 bg-black rounded-xl border-solid border max-w-[300px]">
                <div className="flex items-center w-fit">
                    <div className="flex-shrink-0">
                        <Image className="rounded-full" width={32} height={32} src={Harion} alt="user photo" />
                    </div>
                    <div className="pl-3">
                        <span className="block text-sm font-bold text-white">Placeholder Project</span>
                    </div>
                </div>
            </div>
            <hr />
            <GoldButton className={'mb-1'}>New project</GoldButton>
            <hr />
            <div className="relative mb-4">
                <input
                    type="text"
                    className="bg-black text-sm border-2 border-solid border-gray-800 rounded-xl px-4 py-1 text-white placeholder-gray-400 focus:outline-none focus:border-gold"
                    placeholder="Search a project"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="absolute top-0 right-0 mr-3 h-full flex items-center">
                    <Search className="w-4 h-4 fill-white" />
                </div>
            </div>
            <div className={'flex flex-col gap-y-4 px-2 w-full overflow-y-auto'}>
                <ProjectLink name={'Test'} picture={Harion} />
                {/*{projects*/}
                {/*    .filter((project) => project.name.toLowerCase().includes(search.toLowerCase()))*/}
                {/*    .map((project, index) => (*/}
                {/*        <ProjectLink key={index} name={project.name} picture={Harion} />*/}
                {/*    ))}*/}
            </div>
        </>
    );
}
