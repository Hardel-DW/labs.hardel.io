import FastFetcher from '@libs/request/fast-fetcher';
import { CreateProjectModel, UpdateProjectModel } from '@repositories/Project';
import { ProjectRole } from '@prisma/client';

export const updateProject = async (projectId: string, data: UpdateProjectModel) => {
    return await new FastFetcher('/api/projects', 'PUT')
        .appendMutateUrl('/api/projects/select')
        .appendMutateUrl('/api/projects')
        .setBody({ projectId, ...data })
        .fetching();
};

export const createProject = async <T>(data: CreateProjectModel) => {
    return await new FastFetcher('/api/projects', 'POST').setBody(data).fetching<T>();
};

export const deleteProject = async (projectId: string) => {
    return await new FastFetcher('/api/projects', 'DELETE')
        .appendMutateUrl('/api/projects/select')
        .appendMutateUrl('/api/projects')
        .setBody({ projectId })
        .fetching();
};

export const uploadProjectAsset = async (projectId: string, asset: File) => {
    return await new FastFetcher(`/api/projects/asset/${projectId}`, 'PATCH')
        .appendMutateUrl('/api/projects/select')
        .appendMutateUrl('/api/projects')
        .setFormData({ asset })
        .fetching();
};

export const selectProject = async (projectId: string) => {
    return await new FastFetcher(`/api/projects/select/${projectId}`, 'PATCH')
        .appendMutateUrl('/api/projects/select')
        .appendMutateUrl('/api/projects')
        .fetching();
};

export const inviteProjectMember = async (projectId: string, email: string) => {
    return await new FastFetcher('/api/projects/invite', 'PATCH')
        .appendMutateUrl('/api/projects/members')
        .setBody({ projectId, email })
        .fetching();
};

export const acceptProjectInvite = async (projectId: string) => {
    return await new FastFetcher(`/api/projects/accept/${projectId}`, 'PATCH')
        .appendMutateUrl('/api/projects/members')
        .setBody({ projectId })
        .fetching();
};

export const leaveProject = async (projectId: string) => {
    return await new FastFetcher(`/api/projects/leave/${projectId}`, 'PATCH')
        .appendMutateUrl('/api/projects/members')
        .setBody({ projectId })
        .fetching();
};

export const banProjectMember = async (projectId: string, userId: string) => {
    return await new FastFetcher('/api/projects/ban', 'PATCH')
        .appendMutateUrl('/api/projects/members')
        .setBody({ projectId, removedUserId: userId })
        .fetching();
};

export const transferProjectOwnership = async (projectId: string, email: string) => {
    return await new FastFetcher('/api/projects/owner', 'PATCH').setBody({ projectId, email }).fetching();
};

export const changeUserRole = async (projectId: string, userId: string, role: ProjectRole) => {
    return await new FastFetcher('/api/projects/role', 'PATCH').setBody({ projectId, targetUserId: userId, role }).fetching();
};
