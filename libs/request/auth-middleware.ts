import { RoleType } from '@prisma/client';
import { getToken, JWT } from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';

const secret = process.env.SECRET as string;

type AuthMiddlewareOptions = {
    role?: RoleType;
};

type Data = {
    isAuthenticated: boolean;
    hasRole: boolean;
    data?: JWT;
};

function authMiddleware() {
    return async (req: NextApiRequest, res: NextApiResponse, option: AuthMiddlewareOptions): Promise<Data> => {
        const token = await getToken({ req, secret });
        if (!token) {
            return {
                isAuthenticated: false,
                hasRole: false
            };
        } else {
            const role = token.userData?.roles;
            if (option && option.role && role !== option.role) {
                return {
                    isAuthenticated: true,
                    hasRole: false,
                    data: token
                };
            } else {
                return {
                    isAuthenticated: true,
                    hasRole: true,
                    data: token
                };
            }
        }
    };
}

const AuthMiddleware = authMiddleware();
export default AuthMiddleware;
