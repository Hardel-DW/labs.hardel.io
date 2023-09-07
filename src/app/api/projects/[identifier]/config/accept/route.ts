import { NextRequest, NextResponse } from 'next/server';
import ProjectRepository from '@repositories/Project';
import prisma from '@/libs/prisma';
import { RestErrorHandler } from '@/libs/rest-error-handler';
import { ErrorType, StatusCode } from '@/libs/constant';
import RestUsers from '@/libs/rest-users';

type Params = {
    params: {
        identifier: string;
    };
};

export async function PATCH(request: NextRequest, { params }: Params) {
    try {
        const userId = await new RestUsers(request).getUser();
        const response = await new ProjectRepository(prisma.project).acceptInvite(params.identifier, userId);
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json(new RestErrorHandler(ErrorType.InternalServerError, error), { status: StatusCode.InternalServerError });
    }
}
