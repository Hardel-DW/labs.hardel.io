import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import { RestErrorHandler } from '@/libs/rest-error-handler';
import { ErrorType, StatusCode } from '@/libs/constant';
import RestUsers from '@/libs/rest-users';
import CategoryRepository, { CreateCategoryModel } from '@repositories/Category';

type Params = {
    params: {
        identifier: string;
    };
};

export async function GET(request: NextRequest, { params }: Params) {
    try {
        const userId = await new RestUsers(request).getUser();
        const response = await new CategoryRepository(prisma.category).findByProject(params.identifier, userId);
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json(new RestErrorHandler(ErrorType.InternalServerError, error), { status: StatusCode.InternalServerError });
    }
}

export async function POST(request: NextRequest, { params }: Params) {
    try {
        const userId = await new RestUsers(request).getUser();
        const { data }: { data: CreateCategoryModel } = await request.json();

        const response = await new CategoryRepository(prisma.category).create(params.identifier, userId, data);
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json(new RestErrorHandler(ErrorType.InternalServerError, error), { status: StatusCode.InternalServerError });
    }
}

export async function DELETE(request: NextRequest, { params }: Params) {
    try {
        const userId = await new RestUsers(request).getUser();
        const { itemId }: { itemId: string } = await request.json();

        const response = await new CategoryRepository(prisma.category).delete(params.identifier, userId, itemId);
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json(new RestErrorHandler(ErrorType.InternalServerError, error), { status: StatusCode.InternalServerError });
    }
}
