import { NextApiRequest, NextApiResponse } from 'next';
import RestHelper from '@libs/request/rest-helper';
import { ErrorType, StatusCode } from '@libs/constant';
import ProjectRepository from '@repositories/Project';
import prisma from '@libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const userId = await new RestHelper(req, res).getUserId();
        switch (req.method) {
            case 'GET': {
                const response = await new ProjectRepository(prisma.project).getMembersData(userId);
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
