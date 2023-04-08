import ActivityContainer from '@main/dashboard/activity/ActivityContainer';
import { AsyncSessionProps } from '@definitions/next-auth';
import ActivityRepository from '@repositories/ActivityRepository';
import prisma from '@libs/prisma';
import { getSession } from '@libs/session';
import { notFound } from 'next/navigation';

const getData = async (id?: string) => {
    if (!id) throw new Error('No id provided');
    return await new ActivityRepository(prisma.activity).getAll(id);
};

export default async function ActivityManager(props: AsyncSessionProps) {
    const session = await getSession();
    const data = await getData(session?.project?.id);

    if (!session) {
        notFound();
    }

    return <ActivityContainer data={data} />;
}
