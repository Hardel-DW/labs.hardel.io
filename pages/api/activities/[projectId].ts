import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorType, StatusCode } from '@libs/constant';
import ActivityRepository from '@repositories/ActivityRepository';
import prisma from '@libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const projectId = req.query.projectId as string;

    try {
        switch (req.method) {
            case 'GET': {
                const response = await new ActivityRepository(prisma.activity).getAll(projectId);
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
