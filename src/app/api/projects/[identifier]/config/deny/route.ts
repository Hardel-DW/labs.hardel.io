import { NextRequest, NextResponse } from 'next/server';
import { RestErrorHandler } from '@/libs/rest-error-handler';
import { ErrorType, StatusCode } from '@/libs/constant';
import RestUsers from '@/libs/rest-users';
import ProjectRepository from '@repositories/Project';
import prisma from '@/libs/prisma';

type Params = {
    params: {
        identifier: string;
    };
};

export async function PUT(request: NextRequest, { params }: Params) {
    try {
        const userId = await new RestUsers(request).getUser();
        const response = await new ProjectRepository(prisma.project).denyProject(params.identifier, userId);
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json(new RestErrorHandler(ErrorType.InternalServerError, error), { status: StatusCode.InternalServerError });
    }
}
