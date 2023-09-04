import { NextRequest, NextResponse } from 'next/server';
import { ErrorType, StatusCode } from '@/libs/constant';
import { RestErrorHandler } from '@/libs/rest-error-handler';
import { PrismaClient } from '@prisma/client';

export async function GET(request: NextRequest) {
    try {
        const prisma = new PrismaClient();
        const response = await prisma.item.findMany({
            where: {
                custom: false
            }
        });

        NextResponse.json(response);
    } catch (error: any) {
        NextResponse.json(new RestErrorHandler(ErrorType.InternalServerError, error), { status: StatusCode.InternalServerError });
    }
}
