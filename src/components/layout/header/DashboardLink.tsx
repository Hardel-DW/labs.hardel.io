'use client';

import Link from 'next/link';
import { clx } from '@/libs/utils';
import { usePathname } from 'next/navigation';

type Props = {
    href: string;
    children: string;
};

export default function DashboardLink(props: Props) {
    const pathname = usePathname();

    return (
        <Link
            className={clx(
                'text-zinc-500 bg-transparent transition duration-300 ease-in-out font-semibold py-1 px-2 rounded-md',
                props.href === pathname ? 'bg-[#7c5a0d] text-zinc-200 hover:text-white' : 'hover:bg-[#7c5a0d] hover:text-zinc-200'
            )}
            href={props.href}
        >
            {props.children}
        </Link>
    );
}
