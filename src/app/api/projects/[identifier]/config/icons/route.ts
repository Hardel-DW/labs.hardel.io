import { NextRequest, NextResponse } from 'next/server';
import { RestErrorHandler } from '@/libs/rest-error-handler';
import { ErrorType, StatusCode } from '@/libs/constant';
import RestUsers from '@/libs/rest-users';
import ProjectRepository from '@repositories/Project';
import prisma from '@/libs/prisma';
import { ProjectRole } from '@prisma/client';
import uploadAsset from '@/libs/aws/upload';

type Params = {
    params: {
        identifier: string;
    };
};

export async function POST(request: NextRequest, { params }: Params) {
    const data = await request.formData();
    const destination = 'project/' + params.identifier;
    const icons = data.get('images') as File | null;

    if (!icons) {
        return NextResponse.json(new RestErrorHandler(ErrorType.BadRequest, 'No icons provided'), { status: StatusCode.BadRequest });
    }

    try {
        const userId = await new RestUsers(request).getUser();
        await new ProjectRepository(prisma.project).hasPermission(params.identifier, userId, [ProjectRole.OWNER]);

        const response = await uploadAsset(destination, icons, {
            height: 64,
            width: 64,
            filename: 'icon'
        });

        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json(new RestErrorHandler(ErrorType.InternalServerError, error), { status: StatusCode.InternalServerError });
    }
}
