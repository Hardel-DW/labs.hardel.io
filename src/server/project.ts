'use server';

import ProjectRepository from '@repositories/Project';
import prisma from '@/libs/prisma';
import { redirect } from 'next/navigation';
import { getSession } from '@/libs/session';
import { revalidatePath } from 'next/cache';
import { ProjectRole } from '@prisma/client';

export const createProject = async (formData: FormData) => {
    const session = await getSession();

    if (session && session.id) {
        await new ProjectRepository(prisma.project).create(session.userData.id, {
            name: formData.get('title') as string,
            description: formData.get('description') as string,
            version: '1.20',
            namespace: formData.get('namespace') as string,
            asset: formData.get('icons') as File
        });

        redirect('/dashboard');
    }
};

export const selectProject = async (formData: FormData) => {
    const session = await getSession();

    if (session && session.id) {
        await new ProjectRepository(prisma.project).selectProject(formData.get('id') as string, session.userData.id);
        revalidatePath('/dashboard');
    }
};

export const leaveProject = async (formData: FormData) => {
    const session = await getSession();

    if (session && session.id) {
        await new ProjectRepository(prisma.project).leaveProject(formData.get('id') as string, session.userData.id);
        revalidatePath('/dashboard');
    }
};

export const deleteProject = async (formData: FormData) => {
    const session = await getSession();

    if ((formData.get('confirm') as string) !== session?.project?.name) {
        throw new Error('Invalid project name');
    }

    if (session && session.id) {
        await new ProjectRepository(prisma.project).delete(formData.get('id') as string, session.userData.id);
        revalidatePath('/dashboard');
    }
};

export const updateProject = async (formData: FormData) => {
    const session = await getSession();

    if (session && session.id) {
        await new ProjectRepository(prisma.project).update(formData.get('id') as string, session.userData.id, {
            name: (formData.get('name') as string | null) ?? undefined,
            description: (formData.get('description') as string | null) ?? undefined,
            version: (formData.get('version') as string | null) ?? undefined,
            namespace: (formData.get('namespace') as string | null) ?? undefined
        });
        revalidatePath('/dashboard/settings');
    }
};

export const updateProjectAsset = async (formData: FormData) => {
    const session = await getSession();

    if (session && session.id) {
        await new ProjectRepository(prisma.project).updateAsset(
            formData.get('id') as string,
            session.userData.id,
            formData.get('icons') as File
        );
    }
};

export const updateRole = async (formData: FormData) => {
    const session = await getSession();

    if (session && session.id) {
        await new ProjectRepository(prisma.project).updateUserRole(
            formData.get('id') as string,
            session.userData.id,
            formData.get('member') as string,
            formData.get('role') as ProjectRole
        );
        revalidatePath('/dashboard/settings/members');
    }
};

export const inviteMember = async (formData: FormData) => {
    const session = await getSession();

    if (session && session.id) {
        await new ProjectRepository(prisma.project).inviteUser(
            formData.get('id') as string,
            session.userData.id,
            formData.get('email') as string
        );
        revalidatePath('/dashboard/settings/members');
    }
};

export const removeMember = async (formData: FormData) => {
    const session = await getSession();

    if (session && session.id) {
        await new ProjectRepository(prisma.project).removeUserInProject(
            formData.get('id') as string,
            session.userData.id,
            formData.get('member') as string
        );
        revalidatePath('/dashboard/settings/members');
    }
};

export const transferOwnership = async (formData: FormData) => {
    const session = await getSession();

    if (session && session.id) {
        await new ProjectRepository(prisma.project).transferOwnership(
            formData.get('id') as string,
            session.userData.id,
            formData.get('email') as string
        );
        redirect('/dashboard/settings/members');
    }
};
