import { NextApiRequest, NextApiResponse } from 'next';
import RestHelper from '@libs/request/rest-helper';
import { ErrorType, StatusCode } from '@libs/constant';
import prisma from '@libs/prisma';
import ProjectRepository from '@repositories/Project';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const projectId = req.query.projectId as string;

    const userId = await new RestHelper(req, res).getUserId();
    try {
        switch (req.method) {
            case 'PATCH': {
                const response = await new ProjectRepository(prisma.project).selectProject(projectId, userId);
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
