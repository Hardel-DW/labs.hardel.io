import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/libs/prisma';
import GithubProvider from 'next-auth/providers/github';
import UserDataRepository from '@repositories/UserData';
import ProjectRepository from '@repositories/Project';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 60 * 60
    },
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        })
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            if (account?.access_token) {
                token.accessToken = account.access_token;
            }

            if (user) {
                token.id = user.id;
            }

            if (token.id) {
                token.userData = await new UserDataRepository(prisma.userData).getByUserId(token.id);
                token.project = await new ProjectRepository(prisma.project).sessionProject(token.id);
            }

            return token;
        },
        async session({ session, token }) {
            if (token?.id) {
                session.id = token.id;
            }

            if (token?.accessToken) {
                session.accessToken = token.accessToken;
            }

            if (token?.userData) {
                session.userData = token.userData;
            }

            if (token?.project) {
                session.project = token.project;
            }

            return session;
        }
    },
    events: {
        async createUser({ user }) {
            await new UserDataRepository(prisma.userData).create(user.id);
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
