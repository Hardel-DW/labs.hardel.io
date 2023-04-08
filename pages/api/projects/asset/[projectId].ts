import { NextApiRequest, NextApiResponse } from 'next';
import RestHelper from '@libs/request/rest-helper';
import { ErrorType, StatusCode } from '@libs/constant';
import formidableParser from '@libs/request/formidable-parser';
import formidable from 'formidable';
import ProjectRepository from '@repositories/Project';
import prisma from '@libs/prisma';
import { ProjectRole } from '@prisma/client';
import uploadAsset from '@libs/aws/upload';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const projectId = req.query.projectId as string;
    const form = await formidableParser(req);
    const file = form.files.asset as formidable.File;
    const destination = `project/${projectId}`;

    if (!file) {
        res.status(StatusCode.BadParameter).json({ code: ErrorType.BadParameter });
        return;
    }

    try {
        const userId = await new RestHelper(req, res).getUserId();
        switch (req.method) {
            case 'PATCH': {
                await new ProjectRepository(prisma.project).hasPermission(projectId, userId, [ProjectRole.OWNER]);
                const response = await uploadAsset(destination, file, {
                    height: 64,
                    width: 64,
                    filename: 'icon'
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
