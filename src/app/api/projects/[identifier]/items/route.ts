import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import { RestErrorHandler } from '@/libs/rest-error-handler';
import { ErrorType, StatusCode } from '@/libs/constant';
import ItemRepository, { CreateItemModel } from '@repositories/Items';
import RestUsers from '@/libs/rest-users';

type Params = {
    params: {
        identifier: string;
    };
};

export async function GET(request: NextRequest, { params }: Params) {
    try {
        const userId = await new RestUsers(request).getUser();
        const response = await new ItemRepository(prisma.item).findByProject(params.identifier, userId);
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json(new RestErrorHandler(ErrorType.InternalServerError, error), { status: StatusCode.InternalServerError });
    }
}

export async function POST(request: NextRequest, { params }: Params) {
    try {
        const userId = await new RestUsers(request).getUser();
        const { data }: { data: CreateItemModel } = await request.json();

        const response = await new ItemRepository(prisma.item).create(params.identifier, userId, data);
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json(new RestErrorHandler(ErrorType.InternalServerError, error), { status: StatusCode.InternalServerError });
    }
}

export async function DELETE(request: NextRequest, { params }: Params) {
    try {
        const userId = await new RestUsers(request).getUser();
        const { itemId }: { itemId: string } = await request.json();

        const response = await new ItemRepository(prisma.item).delete(params.identifier, userId, itemId);
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json(new RestErrorHandler(ErrorType.InternalServerError, error), { status: StatusCode.InternalServerError });
    }
}
