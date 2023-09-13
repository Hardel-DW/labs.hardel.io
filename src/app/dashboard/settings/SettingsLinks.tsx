'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clx } from '@/libs/utils';

export default function SettingsLinks(props: { href: string; children: string }) {
    const pathname = usePathname();

    return (
        <Link
            className={clx(
                'px-4 py-2 rounded-md transition duration-300 ease-in-out',
                props.href === pathname ? 'bg-[#7c5a0d] text-zinc-200 hover:text-white' : 'hover:bg-[#7c5a0d] hover:text-zinc-200'
            )}
            href={props.href}
        >
            {props.children}
        </Link>
    );
}
