import { NextRequest, NextResponse } from 'next/server';
import { ErrorType, StatusCode } from '@/libs/constant';
import { RestErrorHandler } from '@/libs/rest-error-handler';
import prisma from '@/libs/prisma';
import ItemRepository from '@repositories/Items';

type Params = {
    params: {
        category: string;
    };
};

export async function GET(request: NextRequest, { params }: Params) {
    const category = 'minecraft:' + params.category;

    try {
        const response = await new ItemRepository(prisma.item).findByCategory(category);
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json(new RestErrorHandler(ErrorType.InternalServerError, error), { status: StatusCode.InternalServerError });
    }
}
