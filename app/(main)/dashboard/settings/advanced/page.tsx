import Front from '@main/dashboard/settings/advanced/Front';
import { redirect } from 'next/navigation';
import { ProjectRole } from '@prisma/client';
import { getSession } from '@libs/session';

export default async function Advanced() {
    const session = await getSession();
    if (!session?.project) redirect('/');
    if (session?.project?.role !== ProjectRole.OWNER) redirect('/');

    return (
        <div className={'flex flex-col gap-y-8'}>
            <Front session={session} />
        </div>
    );
}
