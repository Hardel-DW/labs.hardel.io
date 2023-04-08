import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorType, StatusCode } from '@libs/constant';
import ItemRepository from '@repositories/Items';
import prisma from '@libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case 'GET': {
                const response = await new ItemRepository(prisma.item).findAll(false);
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
