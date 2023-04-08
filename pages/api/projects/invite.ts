import { NextApiRequest, NextApiResponse } from 'next';
import RestHelper from '@libs/request/rest-helper';
import { ErrorType, StatusCode } from '@libs/constant';
import ProjectRepository from '@repositories/Project';
import prisma from '@libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { projectId, email } = req.body;

    try {
        const userId = await new RestHelper(req, res).getUserId();
        switch (req.method) {
            case 'POST': {
                const response = await new ProjectRepository(prisma.project).inviteUser(projectId, userId, email);
                res.status(StatusCode.Ok).json(response);
                break;
            }
            default: {
                res.status(StatusCode.MethodNotAllowed).json({ code: ErrorType.MethodNotAllowed });
            }
        }
    } catch (error) {
        res.status(StatusCode.InternalServerError).json({ code: ErrorType.InternalServerError, error });
    }
}
