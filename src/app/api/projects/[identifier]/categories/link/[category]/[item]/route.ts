import { NextRequest, NextResponse } from 'next/server';
import CategoryRepository from '@repositories/Category';
import prisma from '@/libs/prisma';
import { RestErrorHandler } from '@/libs/rest-error-handler';
import { ErrorType, StatusCode } from '@/libs/constant';
import RestUsers from '@/libs/rest-users';

type Params = {
    params: {
        identifier: string;
        category: string;
        item: string;
    };
};
export async function PATCH(request: NextRequest, { params }: Params) {
    try {
        const userId = await new RestUsers(request).getUser();
        const response = await new CategoryRepository(prisma.category).connectCustomItemToCategory(
            params.identifier,
            userId,
            params.category,
            params.item
        );
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json(new RestErrorHandler(ErrorType.InternalServerError, error), { status: StatusCode.InternalServerError });
    }
}
