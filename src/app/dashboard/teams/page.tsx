import DashboardHeader from '@/components/layout/DashboardHeader';
import prisma from '@/libs/prisma';
import { getSession } from '@/libs/session';
import { notFound } from 'next/navigation';
import ProjectRepository from '@repositories/Project';
import MembersManager from '@/app/dashboard/teams/MembersManager';

const getMembers = async () => {
    const session = await getSession();
    if (!session || !session.id || !session.project) notFound();
    return await new ProjectRepository(prisma.project).getMembersData(session.project.id, session.userData.id);
};

export default async function TeamsPages() {
    const members = await getMembers();

    return (
        <DashboardHeader name={'Teams'}>
            <hr className={'mb-8'} />
            <MembersManager members={members} />
        </DashboardHeader>
    );
}
