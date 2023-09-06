import { NextResponse } from 'next/server';
import { ErrorType, StatusCode } from '@/libs/constant';
import { RestErrorHandler } from '@/libs/rest-error-handler';
import prisma from '@/libs/prisma';
import ItemRepository from '@repositories/Items';

export async function GET() {
    try {
        const response = await new ItemRepository(prisma.item).findAll(false, false);
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json(new RestErrorHandler(ErrorType.InternalServerError, error), { status: StatusCode.InternalServerError });
    }
}
