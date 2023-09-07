import { NextRequest, NextResponse } from 'next/server';
import ProjectRepository from '@repositories/Project';
import prisma from '@/libs/prisma';
import { RestErrorHandler } from '@/libs/rest-error-handler';
import { ErrorType, StatusCode } from '@/libs/constant';
import RestUsers from '@/libs/rest-users';
import { ProjectRole } from '@prisma/client';

type Params = {
    params: {
        identifier: string;
        user: string;
    };
};
export async function PATCH(request: NextRequest, { params }: Params) {
    try {
        const userId = await new RestUsers(request).getUser();
        const { role }: { role: ProjectRole } = await request.json();

        const response = await new ProjectRepository(prisma.project).updateUserRole(params.identifier, userId, params.user, role);
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json(new RestErrorHandler(ErrorType.InternalServerError, error), { status: StatusCode.InternalServerError });
    }
}
