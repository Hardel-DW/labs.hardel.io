declare global {
    namespace NodeJS {
        interface ProcessEnv {
            POSTGRES_URL: string;
            POSTGRES_PRISMA_URL: string;
            POSTGRES_URL_NON_POOLING: string;
            POSTGRES_USER: string;
            POSTGRES_HOST: string;
            POSTGRES_PASSWORD: string;
            POSTGRES_DATABASE: string;

            NEXTAUTH_SECRET: string;
            GITHUB_SECRET: string;
            GITHUB_ID: string;

            ASSET_PREFIX: string;
            R2_ACCOUNT_ID: string;
            S3_BUCKET_NAME: string;
            S3_SECRET_KEY: string;
            S3_ACCESS_KEY_ID: string;
        }
    }
}
