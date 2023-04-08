import { NextApiRequest, NextApiResponse } from 'next';
import RestHelper from '@libs/request/rest-helper';
import { ErrorType, StatusCode } from '@libs/constant';
import prisma from '@libs/prisma';
import ProjectRepository from '@repositories/Project';
import UserDataRepository from "@repositories/UserData";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { projectId, data } = req.body;

    try {
        const userId = await new RestHelper(req, res).getUserId();
        switch (req.method) {
            case 'GET': {
                const response = await new UserDataRepository(prisma.userData).findProjectsByUserId(userId);
                res.status(StatusCode.Ok).json(response);
                break;
            }
            case 'DELETE': {
                const response = await new ProjectRepository(prisma.project).delete(projectId, userId);
                res.status(StatusCode.Ok).json(response);
                break;
            }
            case 'PUT': {
                const response = await new ProjectRepository(prisma.project).update(projectId, userId, data);
                res.status(StatusCode.Ok).json(response);
                break;
            }
            case 'POST': {
                const response = await new ProjectRepository(prisma.project).create(userId, data);
                res.status(StatusCode.Created).json(response);
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
