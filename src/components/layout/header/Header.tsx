import Link from 'next/link';
import Image from 'next/image';
import SelectedProject from '@/components/layout/header/SelectedProject';
import UserDropdown from '@/components/layout/header/UserDropdown';
import LoginButton from '@/components/layout/header/LoginButton';
import UserDataRepository from '@repositories/UserData';
import { ReadableProjectData } from '@/types/project';
import prisma from '@/libs/prisma';
import MobileDropdown from '@/components/layout/header/MobileDropdown';
import { getSession } from '@/libs/session';

export default async function Header() {
    const session = await getSession();
    const projects: ReadableProjectData[] = session?.userData
        ? await new UserDataRepository(prisma.userData).findProjectsByUserId(session.userData.id)
        : [];

    return (
        <nav
            className="bg-black/10 absolute z-20 backdrop-blur-sm px-4 py-2.5 items-center"
            style={{ width: 'calc(100dvw - (100dvw - 100%))' }}
        >
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
                            <ul className="hidden md:flex flex-col text-white font-semibold md:flex-row md:space-x-4 md:mt-0 md:text-[14px]">
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

                <div className="hidden m:flex items-center md:order-2">
                    <div className="relative mr-4 w-8 h-8">
                        <Image src="/icons/common/search.svg" className="h-full w-full fill-white" alt="Search" width={32} height={32} />
                    </div>
                    {session?.user ? <UserDropdown session={session} /> : <LoginButton />}
                </div>
            </div>

            <div className="md:hidden w-full">
                <MobileDropdown>
                    <Link href={'/'} className="block py-2 pl-3 text-white md:bg-transparent md:p-0">
                        Home
                    </Link>
                    <Link href={'/'} className="block py-2 pl-3 text-gray-400 md:hover:bg-transparent md:p-0">
                        Blog
                    </Link>
                    <Link href={'/'} className="block py-2 pl-3 text-gray-400 md:hover:bg-transparent md:p-0">
                        Changelog
                    </Link>
                    <Link href={'/generator'} className="block py-2 pl-3 text-gray-400 md:hover:bg-transparent md:p-0">
                        Generator
                    </Link>
                    <Link href={'/'} className="block py-2 pl-3 text-gray-400 md:hover:bg-transparent md:p-0">
                        Donation
                    </Link>
                    <Link href={'/'} className="block py-2 pl-3 text-gray-400 md:hover:bg-transparent md:p-0">
                        Contact
                    </Link>
                </MobileDropdown>
            </div>
        </nav>
    );
}
