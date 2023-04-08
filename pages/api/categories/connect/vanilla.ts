import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorType, StatusCode } from '@libs/constant';
import AuthMiddleware from '@libs/request/auth-middleware';
import { RoleType } from '@prisma/client';
import CategoryRepository from '@repositories/Category';
import prisma from '@libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { categoryId, itemId } = req.body;
    const auth = await AuthMiddleware(req, res, { role: RoleType.ADMIN });
    if (!auth.isAuthenticated || !auth.hasRole) {
        res.status(StatusCode.Unauthorized).json({ code: ErrorType.Unauthorized });
        return;
    }

    try {
        switch (req.method) {
            case 'PATCH': {
                const response = await new CategoryRepository(prisma.category).connectItem(categoryId, itemId);
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
