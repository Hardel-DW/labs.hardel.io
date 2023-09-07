import { NextRequest, NextResponse } from 'next/server';
import { RestErrorHandler } from '@/libs/rest-error-handler';
import { ErrorType, StatusCode } from '@/libs/constant';
import RestUsers from '@/libs/rest-users';
import ProjectRepository from '@repositories/Project';
import prisma from '@/libs/prisma';
import uploadAsset from '@/libs/aws/upload';
import ItemRepository from '@repositories/Items';

type Params = {
    params: {
        identifier: string;
    };
};

export async function POST(request: NextRequest, { params }: Params) {
    const data = await request.formData();
    const files = data.get('images') as File | null;
    const itemId = data.get('item') as string | null;
    const destination = `project/${params.identifier}/item`;

    if (!files || !itemId) {
        return NextResponse.json(new RestErrorHandler(ErrorType.BadRequest, 'No icons provided'), { status: StatusCode.BadRequest });
    }

    try {
        const userId = await new RestUsers(request).getUser();
        await new ProjectRepository(prisma.project).checkIfUserIsInProject(params.identifier, userId);
        await new ItemRepository(prisma.item).checkIfItemExists(params.identifier, itemId);

        const response = await uploadAsset(destination, files, {
            height: 64,
            width: 64,
            filename: itemId
        });

        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json(new RestErrorHandler(ErrorType.InternalServerError, error), { status: StatusCode.InternalServerError });
    }
}
