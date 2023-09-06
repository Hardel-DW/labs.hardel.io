import { NextRequest, NextResponse } from 'next/server';
import { ErrorType, StatusCode } from '@/libs/constant';
import { RestErrorHandler } from '@/libs/rest-error-handler';
import prisma from '@/libs/prisma';
import CategoryRepository from '@repositories/Category';

export async function GET(request: NextRequest) {
    try {
        const response = await new CategoryRepository(prisma.category).findAll(false, false);
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json(new RestErrorHandler(ErrorType.InternalServerError, error), { status: StatusCode.InternalServerError });
    }
}
