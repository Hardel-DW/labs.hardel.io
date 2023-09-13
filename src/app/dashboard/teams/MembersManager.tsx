'use client';

import { ReadableProjectData } from '@/types/project';
import { useMemo, useState } from 'react';
import FormInput from '@/components/form/FormInput';
import MemberCard from '@/app/dashboard/teams/MemberCard';
import Link from 'next/link';
import Button from '@/components/form/Button';

export default function MembersManager({ members }: { members: ReadableProjectData }) {
    const [search, setSearch] = useState('');

    const display = useMemo(() => {
        return members?.users.filter((member) => member.accountData?.name.toLowerCase().includes(search.toLowerCase()));
    }, [members?.users, search]);

    return (
        <div>
            <div className={'flex mb-8 md:flex-row flex-col gap-y-4'}>
                <div className={'flex flex-auto flex-col'}>
                    <FormInput type={'text'} placeholder="Search a project" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <Link href={'/dashboard/settings/members'}>
                    <Button className={'md:ml-4 w-full'}>Invite members</Button>
                </Link>
            </div>

            {display?.length === 0 && (
                <div className={'mt-40 flex flex-col items-center justify-center'}>
                    <span className={'text-2xl font-bold text-gold'}>No members found</span>
                    <span className={'text-xl text-zinc-200'}>Try to invite a new one</span>
                </div>
            )}

            <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
                {display?.map((member) => (
                    <MemberCard key={member.userId} member={member} />
                ))}
            </div>
        </div>
    );
}
