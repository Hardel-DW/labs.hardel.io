import { NextApiRequest, NextApiResponse } from 'next';
import AuthMiddleware from '@libs/request/auth-middleware';
import { RoleType } from '@prisma/client';
import { ErrorType, StatusCode } from '@libs/constant';
import formidableParser from '@libs/request/formidable-parser';
import formidable from 'formidable';
import uploadAsset from '@libs/aws/upload';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const auth = await AuthMiddleware(req, res, { role: RoleType.ADMIN });
    if (!auth.isAuthenticated || !auth.hasRole) {
        res.status(StatusCode.Unauthorized).json({ error: ErrorType.Unauthorized });
        return;
    }

    const form = await formidableParser(req);
    const file = form.files.asset as formidable.File;
    const minecraftId = form.fields.minecraftId as string;
    if (!file || !minecraftId) {
        res.status(StatusCode.BadRequest).json({ error: ErrorType.BadRequest });
        return;
    }

    const destination = `minecraft/items`;
    const filename = minecraftId.split(':')[1];

    try {
        switch (req.method) {
            case 'PATCH': {
                const response = await uploadAsset(destination, file, { filename });
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
