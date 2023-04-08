import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorType, StatusCode } from '@libs/constant';
import RecipeRepository from '@repositories/Recipe';
import prisma from '@libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id as string;

    try {
        switch (req.method) {
            case 'GET': {
                const response = await new RecipeRepository(prisma.recipes).findByItem(id);
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
