import { NextRequest, NextResponse } from 'next/server';
import { ErrorType, StatusCode } from '@/libs/constant';
import { RestErrorHandler } from '@/libs/rest-error-handler';
import ActivityRepository from '@repositories/ActivityRepository';
import prisma from '@/libs/prisma';

type Params = {
    params: {
        project: string;
    };
};

export async function GET(request: NextRequest, { params }: Params) {
    const project = params.project;

    try {
        const response = await new ActivityRepository(prisma.activity).getAll(project);
        NextResponse.json(response);
    } catch (error: any) {
        NextResponse.json(new RestErrorHandler(ErrorType.InternalServerError, error), { status: StatusCode.InternalServerError });
    }
}
