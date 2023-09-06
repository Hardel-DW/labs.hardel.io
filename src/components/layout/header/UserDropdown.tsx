'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { Session } from 'next-auth';
import Harion from '@images/logo/harion.webp';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import UseClickOutside from '@/libs/hooks/useClickOutside';
import { clx } from '@/libs/utils';

type Props = {
    session: Session | null;
};

export default function UserDropdown({ session }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    UseClickOutside(ref, () => setIsOpen(false));

    return (
        <div>
            <button
                type="button"
                className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300"
                id="user-menu-button"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="sr-only">Open user menu</span>
                <Image className="rounded-full" width={32} height={32} src={session?.user?.image ?? Harion} alt="user photo" />
            </button>

            {session?.user && (
                <div
                    ref={ref}
                    className={clx(
                        'bg-black/90 backdrop-blur-[1rem] absolute top-[72px] right-2 z-[50] border border-zinc-700 text-base list-none rounded-xl shadow-2xl',
                        isOpen ? 'block' : 'hidden'
                    )}
                >
                    <div className="py-3 px-4 w-max">
                        <div className="flex items-center w-fit">
                            <div className="flex-shrink-0">
                                <Image
                                    className="rounded-full"
                                    width={32}
                                    height={32}
                                    src={session?.user?.image ?? Harion}
                                    alt="user photo"
                                />
                            </div>
                            <div className="pl-3">
                                <span className="block text-sm text-white">{session.user.name}</span>
                                <span className="block text-sm font-medium break-keep text-gray-500 truncate max-w-[12rem]">
                                    {session.user.email}
                                </span>
                            </div>
                        </div>
                    </div>
                    <hr className={'my-1'} />
                    <ul className="py-1">
                        <li className={'w-11/12 mx-auto my-1'}>
                            <Link
                                href={'/'}
                                className="block w-full text-start py-2 px-4 text-sm text-white hover:bg-secondary/20 hover:text-white  rounded"
                            >
                                Profile
                            </Link>
                        </li>
                        <li className={'w-11/12 mx-auto my-1'}>
                            <Link
                                href={'/'}
                                className="block w-full text-start py-2 px-4 text-sm text-white hover:bg-secondary/20  hover:text-white rounded"
                            >
                                Settings
                            </Link>
                        </li>
                        <li className={'w-11/12 mx-auto my-1'}>
                            <button
                                onClick={() => signOut()}
                                className="block w-full text-start py-2 px-4 text-sm text-white hover:bg-secondary/20 hover:text-white rounded"
                            >
                                Sign out
                            </button>
                        </li>
                        {session.userData.roles === 'ADMIN' && (
                            <>
                                <hr className={'my-1'} />
                                <li className={'w-11/12 mx-auto my-1'}>
                                    <Link
                                        href={'/admin/dashboard'}
                                        className="block w-full text-start py-2 px-4 text-sm text-white hover:bg-secondary/20 hover:text-white rounded"
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
