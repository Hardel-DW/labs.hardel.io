import { NextApiRequest, NextApiResponse } from 'next';
import RestHelper from '@libs/request/rest-helper';
import { ErrorType, StatusCode } from '@libs/constant';
import RecipeRepository, { CreateRecipeModel } from '@repositories/Recipe';
import prisma from '@libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { recipeId, data } = req.body as { recipeId: string; data: CreateRecipeModel };

    try {
        const { userId, projectId } = await new RestHelper(req, res).getProjectId();
        switch (req.method) {
            case 'GET': {
                const response = await new RecipeRepository(prisma.recipes).findByProject(projectId);
                res.status(StatusCode.Ok).json(response);
                break;
            }
            case 'DELETE': {
                const response = await new RecipeRepository(prisma.recipes).delete(userId, projectId, recipeId);
                res.status(StatusCode.Ok).json(response);
                break;
            }
            case 'PUT': {
                const response = await new RecipeRepository(prisma.recipes).update(userId, projectId, recipeId, data);
                res.status(StatusCode.Ok).json(response);
                break;
            }
            case 'POST': {
                const response = await new RecipeRepository(prisma.recipes).create(userId, projectId, data);
                res.status(StatusCode.Created).json(response);
                break;
            }
            default: {
                res.status(StatusCode.MethodNotAllowed).json({ code: ErrorType.MethodNotAllowed });
            }
        }
    } catch (error: any) {
        res.status(StatusCode.InternalServerError).json({
            code: ErrorType.InternalServerError,
            error: {
                message: error.message
            }
        });
    }
}
