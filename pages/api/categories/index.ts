import { NextApiRequest, NextApiResponse } from 'next';
import RestHelper from '@libs/request/rest-helper';
import { ErrorType, StatusCode } from '@libs/constant';
import CategoryRepository, { CreateCategoryModel } from '@repositories/Category';
import prisma from '@libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { categoryId, data } = req.body as { categoryId: string; data: CreateCategoryModel };

    try {
        const { projectId, userId } = await new RestHelper(req, res).getProjectId();
        switch (req.method) {
            case 'GET': {
                const response = await new CategoryRepository(prisma.category).findByProject(projectId);
                res.status(StatusCode.Ok).json(response);
                break;
            }
            case 'DELETE': {
                const response = await new CategoryRepository(prisma.category).delete(userId, projectId, categoryId);
                res.status(StatusCode.Ok).json(response);
                break;
            }
            case 'POST': {
                const response = await new CategoryRepository(prisma.category).create(userId, projectId, data);
                res.status(StatusCode.Created).json(response);
                break;
            }
            case 'PUT': {
                const response = await new CategoryRepository(prisma.category).update(userId, projectId, categoryId, data);
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
