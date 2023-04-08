import { NextApiRequest, NextApiResponse } from 'next';
import RestHelper from '@libs/request/rest-helper';
import { ErrorType, StatusCode } from '@libs/constant';
import CategoryRepository from '@repositories/Category';
import prisma from '@libs/prisma';
import { Option } from '@components/form/Select/multiple';
import { z } from 'zod';

export const OptionModel = z.object({
    value: z.string().min(1),
    name: z.string().min(1),
    shortName: z.string().optional()
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { categories } = req.body as { categories: Option[] };

    try {
        const { projectId } = await new RestHelper(req, res).getProjectId();
        switch (req.method) {
            case 'GET': {
                const response = await new CategoryRepository(prisma.category).findByProject(projectId, false);
                res.status(StatusCode.Ok).json(response);
                break;
            }
            case 'POST': {
                z.array(OptionModel).parse(categories);
                const data = await new CategoryRepository(prisma.category).findByProject(projectId, false);
                /*
                                const toCreate = categories.filter((category) => !data.some((item) => item. === category.value));
                */
            }
        }
    } catch (error) {
        res.status(StatusCode.InternalServerError).json({ code: ErrorType.InternalServerError, error });
    }
}
