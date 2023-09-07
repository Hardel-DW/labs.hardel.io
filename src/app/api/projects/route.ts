import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import { RestErrorHandler } from '@/libs/rest-error-handler';
import { ErrorType, StatusCode } from '@/libs/constant';
import RestUsers from '@/libs/rest-users';
import UserDataRepository from '@repositories/UserData';
import ProjectRepository, { CreateProjectModel } from '@repositories/Project';

export async function GET(request: NextRequest) {
    try {
        const userId = await new RestUsers(request).getUser();
        const response = await new UserDataRepository(prisma.userData).findProjectsByUserId(userId);
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json(new RestErrorHandler(ErrorType.InternalServerError, error), { status: StatusCode.InternalServerError });
    }
}

export async function POST(request: NextRequest) {
    try {
        const userId = await new RestUsers(request).getUser();
        const { data }: { data: CreateProjectModel } = await request.json();

        const response = await new ProjectRepository(prisma.project).create(userId, data);
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json(new RestErrorHandler(ErrorType.InternalServerError, error), { status: StatusCode.InternalServerError });
    }
}
