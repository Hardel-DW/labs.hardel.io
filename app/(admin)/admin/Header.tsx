import Link from 'next/link';
import HardelLetter from '@icons/logo/HardelLetter';
import { Suspense } from 'react';
import StreamingAvatar from '@admin/admin/StreamingAvatar';

export default function Header() {
    return (
        <nav className={'flex justify-between p-4 m-4'}>
            <div>
                <Link href={'/admin/dashboard'} className="flex items-center fill-white hover:fill-gold">
                    <HardelLetter className="self-center w-10 h-10" />
                    <span className="text-xl font-semibold whitespace-nowrap">ardel</span>
                </Link>
            </div>

            <button
                type="button"
                className="w-8 h-8 flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300"
                id="user-menu-button"
            >
                <span className="sr-only">Open user menu</span>
                <Suspense fallback={<div className={'w-8 h-8 rounded bg-zinc-700 animate-pulse'} />}>
                    {/* @ts-ignore */}
                    <StreamingAvatar />
                </Suspense>
            </button>
        </nav>
    );
}
