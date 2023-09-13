import ProjectManager from '@/app/dashboard/overview/ProjectManager';
import { notFound } from 'next/navigation';
import UserDataRepository from '@repositories/UserData';
import prisma from '@/libs/prisma';
import { getSession } from '@/libs/session';
import DashboardHeader from '@/components/layout/DashboardHeader';

const getProjects = async (userId: string) => {
    return await new UserDataRepository(prisma.userData).findProjectsByUserId(userId);
};

export default async function DashboardPage() {
    const session = await getSession();
    if (!session || !session.id) notFound();
    const projects = await getProjects(session.userData.id);

    return (
        <DashboardHeader name={'Your Project'}>
            <hr className={'mb-8'} />
            <ProjectManager projects={projects} />
        </DashboardHeader>
    );
}
