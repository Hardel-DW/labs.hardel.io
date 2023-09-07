import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import { RestErrorHandler } from '@/libs/rest-error-handler';
import { ErrorType, StatusCode } from '@/libs/constant';
import RecipeRepository from '@repositories/Recipe';
import RestUsers from '@/libs/rest-users';

type Params = {
    params: {
        identifier: string;
        recipe: string;
    };
};

export async function GET(request: NextRequest, { params }: Params) {
    try {
        const userId = await new RestUsers(request).getUser();
        const response = await new RecipeRepository(prisma.recipes).findByItem(params.identifier, userId);
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json(new RestErrorHandler(ErrorType.InternalServerError, error), { status: StatusCode.InternalServerError });
    }
}
