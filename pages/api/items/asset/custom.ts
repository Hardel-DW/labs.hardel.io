import { NextApiRequest, NextApiResponse } from 'next';
import RestHelper from '@libs/request/rest-helper';
import { ErrorType, StatusCode } from '@libs/constant';
import formidableParser from '@libs/request/formidable-parser';
import formidable from 'formidable';
import ProjectRepository from '@repositories/Project';
import prisma from '@libs/prisma';
import uploadAsset from '@libs/aws/upload';
import ItemRepository from '@repositories/Items';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const form = await formidableParser(req);
    const file = form.files.asset as formidable.File;
    const itemId = form.fields.itemId as string;

    if (!file || !itemId) {
        res.status(StatusCode.BadRequest).json({ error: ErrorType.BadRequest });
        return;
    }

    try {
        const { projectId, userId } = await new RestHelper(req, res).getProjectId();
        switch (req.method) {
            case 'PATCH': {
                await new ProjectRepository(prisma.project).checkIfUserIsInProject(projectId, userId);
                await new ItemRepository(prisma.item).checkIfItemExists(projectId, itemId);
                const response = await uploadAsset(`project/${projectId}/item`, file, {
                    height: 64,
                    width: 64,
                    filename: itemId
                });

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

export const config = {
    api: {
        bodyParser: false
    }
};
