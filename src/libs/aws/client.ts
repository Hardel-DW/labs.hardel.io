import { S3Client } from '@aws-sdk/client-s3';

/**
 * Represents an S3 client.
 */
const S3 = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.S3_SECRET_KEY as string
    }
});

export default S3;
