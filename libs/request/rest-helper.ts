import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorType } from '@libs/constant';
import FormValidator from '@libs/request/form-checker';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@session';
import ProjectRepository from '@repositories/Project';

export default class RestHelper<T> extends FormValidator {
    constructor(private readonly request?: NextApiRequest, private readonly response?: NextApiResponse) {
        super();
        this.request = request;
        this.response = response;

        return this;
    }

    async getUserId(): Promise<string> {
        if (!this.request || !this.response) {
            throw this.sendError(ErrorType.InternalServerError, 'Server error');
        }

        const session = await getServerSession(this.request, this.response, authOptions);
        if (!session) {
            throw this.sendError(ErrorType.Unauthorized, 'User not found');
        }

        const userId = session.id;
        if (!userId) {
            throw this.sendError(ErrorType.Unauthorized, 'User not found');
        }

        return userId;
    }

    async getProjectId(): Promise<{ userId: string; projectId: string; success: boolean }> {
        const userId = await this.getUserId();

        const project = await new ProjectRepository(prisma.project).findSelectedProject(userId);
        if (!project) {
            throw this.sendError(ErrorType.NotFound, 'Project not found');
        }

        return { userId, projectId: project.id, success: true };
    }
}
