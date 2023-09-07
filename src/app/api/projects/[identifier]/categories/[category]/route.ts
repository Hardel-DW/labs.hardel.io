import { NextRequest, NextResponse } from 'next/server';
import RestUsers from '@/libs/rest-users';
import CategoryRepository, { CreateCategoryModel } from '@repositories/Category';
import prisma from '@/libs/prisma';
import { RestErrorHandler } from '@/libs/rest-error-handler';
import { ErrorType, StatusCode } from '@/libs/constant';

type Params = {
    params: {
        identifier: string;
        category: string;
    };
};

export async function PUT(request: NextRequest, { params }: Params) {
    try {
        const userId = await new RestUsers(request).getUser();
        const { data }: { data: CreateCategoryModel } = await request.json();

        const response = await new CategoryRepository(prisma.category).update(params.identifier, userId, params.category, data);
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json(new RestErrorHandler(ErrorType.InternalServerError, error), { status: StatusCode.InternalServerError });
    }
}
