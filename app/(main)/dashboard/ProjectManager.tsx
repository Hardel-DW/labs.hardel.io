import React from 'react';
import { notFound } from 'next/navigation';
import CardContainer from '@main/dashboard/CardCotnainer';
import prisma from '@libs/prisma';
import UserDataRepository from '@repositories/UserData';
import { getSession } from '@libs/session';

const getData = async (id?: string) => {
    if (!id) notFound();
    return await new UserDataRepository(prisma.userData).findProjectsByUserId(id);
};

export default async function ProjectManager() {
    const session = await getSession();
    const data = await getData(session?.id);

    if (!session) {
        notFound();
    }

    return <CardContainer data={data} session={session} />;
}
