import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import { RestErrorHandler } from '@/libs/rest-error-handler';
import { ErrorType, StatusCode } from '@/libs/constant';
import RestUsers from '@/libs/rest-users';
import RecipeRepository, { CreateRecipeModel } from '@repositories/Recipe';

type Params = {
    params: {
        identifier: string;
    };
};

export async function GET(request: NextRequest, { params }: Params) {
    try {
        const userId = await new RestUsers(request).getUser();
        const response = await new RecipeRepository(prisma.recipes).findByProject(params.identifier, userId);
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json(new RestErrorHandler(ErrorType.InternalServerError, error), { status: StatusCode.InternalServerError });
    }
}

export async function POST(request: NextRequest, { params }: Params) {
    try {
        const userId = await new RestUsers(request).getUser();
        const { data }: { data: CreateRecipeModel } = await request.json();

        const response = await new RecipeRepository(prisma.recipes).create(params.identifier, userId, data);
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json(new RestErrorHandler(ErrorType.InternalServerError, error), { status: StatusCode.InternalServerError });
    }
}

export async function PUT(request: NextRequest, { params }: Params) {
    try {
        const userId = await new RestUsers(request).getUser();
        const { id, data }: { id: string; data: CreateRecipeModel } = await request.json();

        const response = await new RecipeRepository(prisma.recipes).update(params.identifier, userId, id, data);
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json(new RestErrorHandler(ErrorType.InternalServerError, error), { status: StatusCode.InternalServerError });
    }
}

export async function DELETE(request: NextRequest, { params }: Params) {
    try {
        const userId = await new RestUsers(request).getUser();
        const { itemId }: { itemId: string } = await request.json();

        const response = await new RecipeRepository(prisma.recipes).delete(params.identifier, userId, itemId);
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json(new RestErrorHandler(ErrorType.InternalServerError, error), { status: StatusCode.InternalServerError });
    }
}
