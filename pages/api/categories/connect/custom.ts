import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorType, StatusCode } from '@libs/constant';
import RestHelper from '@libs/request/rest-helper';
import CategoryRepository from '@repositories/Category';
import prisma from '@libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { categoryId, itemId } = req.body;

    try {
        const { userId, projectId } = await new RestHelper(req, res).getProjectId();
        switch (req.method) {
            case 'PATCH': {
                const response = await new CategoryRepository(prisma.category).connectCustomItemToCategory(
                    userId,
                    projectId,
                    categoryId,
                    itemId
                );
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
