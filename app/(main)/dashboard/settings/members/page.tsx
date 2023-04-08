import Front from '@main/dashboard/settings/members/Front';
import { redirect } from 'next/navigation';
import { ProjectRole } from '@prisma/client';
import { getSession } from '@libs/session';

export default async function Members() {
    const session = await getSession();
    if (!session?.project) redirect('/');

    if (![ProjectRole.OWNER, ProjectRole.ADMIN].some((role) => role === session.project?.role)) {
        redirect('/');
    }

    if (!session) redirect('/');
    return <Front session={session} />;
}
