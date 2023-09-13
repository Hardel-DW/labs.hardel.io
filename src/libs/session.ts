import { cache } from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const getSession = cache(async () => {
    return await getServerSession(authOptions);
});

export const preloadSession = () => {
    void getSession();
};
