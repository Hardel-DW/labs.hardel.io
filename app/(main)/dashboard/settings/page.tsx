import React from 'react';
import Front from '@main/dashboard/settings/Front';
import { redirect } from 'next/navigation';
import { getSession } from '@libs/session';

export default async function Settings() {
    const session = await getSession();
    if (!session?.project) redirect('/');

    return <Front data={session.project} />;
}
