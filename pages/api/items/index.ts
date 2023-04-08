import { NextApiRequest, NextApiResponse } from 'next';
import RestHelper from '@libs/request/rest-helper';
import { ErrorType, StatusCode } from '@libs/constant';
import ItemRepository, { CreateItemModel } from '@repositories/Items';
import prisma from '@libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { itemId, data } = req.body as { itemId: string; data: CreateItemModel };

    try {
        const { projectId, userId } = await new RestHelper(req, res).getProjectId();
        switch (req.method) {
            case 'GET': {
                const response = await new ItemRepository(prisma.item).findByProject(projectId);
                res.status(StatusCode.Ok).json(response);
                break;
            }
            case 'DELETE': {
                const response = await new ItemRepository(prisma.item).delete(userId, projectId, itemId);
                res.status(StatusCode.Ok).json(response);
                break;
            }
            case 'POST': {
                const response = await new ItemRepository(prisma.item).create(userId, projectId, data);
                res.status(StatusCode.Created).json(response);
                break;
            }
            case 'PUT': {
                const response = await new ItemRepository(prisma.item).update(userId, projectId, itemId, data);
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
