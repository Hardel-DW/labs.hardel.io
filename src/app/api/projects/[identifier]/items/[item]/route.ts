import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import { RestErrorHandler } from '@/libs/rest-error-handler';
import { ErrorType, StatusCode } from '@/libs/constant';
import ItemRepository, { CreateItemModel } from '@repositories/Items';
import RestUsers from '@/libs/rest-users';

type Params = {
    params: {
        identifier: string;
        item: string;
    };
};

export async function PUT(request: NextRequest, { params }: Params) {
    try {
        const userId = await new RestUsers(request).getUser();
        const { data }: { data: CreateItemModel } = await request.json();

        const response = await new ItemRepository(prisma.item).update(params.identifier, userId, params.item, data);
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json(new RestErrorHandler(ErrorType.InternalServerError, error), { status: StatusCode.InternalServerError });
    }
}
