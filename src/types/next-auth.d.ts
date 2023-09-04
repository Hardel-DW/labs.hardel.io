import { Session } from 'next-auth';

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        project: ReadableProjectData | null;
        userData: UserData;
        accessToken?: string;
        id: string;
    }
}

declare module 'next-auth/jwt' {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        project: ReadableProjectData | null;
        userData?: UserData;
        accessToken?: string;
        id: string;
    }
}

type AsyncSessionProps = {
    session: Promise<Session | null>;
};
