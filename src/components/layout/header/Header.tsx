import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import Image from 'next/image';
import SelectedProject from '@/components/layout/header/SelectedProject';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import UserDropdown from '@/components/layout/header/UserDropdown';
import LoginButton from '@/components/layout/header/LoginButton';
import UserDataRepository from '@repositories/UserData';
import { ReadableProjectData } from '@/types/project';
import prisma from '@/libs/prisma';

export default async function Header() {
    const session = await getServerSession(authOptions);

    let projects: ReadableProjectData[] = [];
    if (session?.userData?.userId) {
        try {
            projects = await new UserDataRepository(prisma.userData).findProjectsByUserId(session.userData.userId);
        } catch (error) {
            throw new Error("Users found but can't find their projects");
        }
    }

    return (
        <nav className="bg-black/10 relative z-20 backdrop-blur-sm px-4 py-2.5 min-h-[70px] flex items-center">
            <div className="w-full flex flex-wrap justify-between items-center">
                <div className={'flex gap-x-2 items-center'}>
                    <Link href={'/'} className="flex items-center hover:text-white">
                        <Image src="/icons/hardel.svg" className="self-center w-10 h-10" alt="Hardel Letter logo" height={40} width={40} />
                        <span className="text-xl font-semibold whitespace-nowrap">ardel</span>
                    </Link>
                    <Image src="/icons/slash.svg" alt="Slash" height={40} width={40} />
                    {session?.userData ? (
                        <SelectedProject session={session} projects={projects} />
                    ) : (
                        <div className="justify-between items-center w-full md:flex md:w-auto md:order-1">
                            <ul className="flex flex-col text-white font-semibold md:flex-row md:space-x-4 md:mt-0 md:text-[14px]">
                                <li>
                                    <Link href={'/'} className="block py-2 pl-3 text-white md:bg-transparent md:p-0">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'} className="block py-2 pl-3 text-gray-400 md:hover:bg-transparent md:p-0">
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'} className="block py-2 pl-3 text-gray-400 md:hover:bg-transparent md:p-0">
                                        Changelog
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/generator'} className="block py-2 pl-3 text-gray-400 md:hover:bg-transparent md:p-0">
                                        Generator
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'} className="block py-2 pl-3 text-gray-400 md:hover:bg-transparent md:p-0">
                                        Donation
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'} className="block py-2 pl-3 text-gray-400 md:hover:bg-transparent md:p-0">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                <div className="flex items-center md:order-2">
                    <div className="relative mr-4">
                        <input
                            type="text"
                            className="bg-black text-sm border border-solid border-zinc-700 rounded-xl px-4 py-1 text-white placeholder-gray-400 focus:outline-none focus:border-gold"
                            placeholder="Search a command"
                        />
                        <div className="absolute top-0 right-0 mr-3 h-full flex items-center">
                            <Image src="/icons/common/search.svg" className="w-4 h-4 fill-white" alt="Search" width={16} height={16} />
                        </div>
                    </div>
                    {session?.user ? <UserDropdown session={session} /> : <LoginButton />}
                </div>
            </div>
        </nav>
    );
}
