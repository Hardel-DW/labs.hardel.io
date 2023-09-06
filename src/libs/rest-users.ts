import { getServerSession } from 'next-auth/next';
import { RestErrorHandler } from '@/libs/rest-error-handler';
import { ErrorType } from '@/libs/constant';
import { NextRequest } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default class RestUsers {
    constructor(private readonly request?: NextRequest) {
        this.request = request;
        return this;
    }

    async getUser() {
        if (!this.request) {
            throw new RestErrorHandler(ErrorType.InternalServerError, 'Request or response is not defined');
        }

        const session = await getServerSession({ req: this.request, ...authOptions });
        if (!session) {
            throw new RestErrorHandler(ErrorType.Unauthorized, 'Session not found');
        }

        const userId = session.id;
        if (!userId) {
            throw new RestErrorHandler(ErrorType.Unauthorized, 'User not found');
        }

        return userId;
    }
}
