import sharp from 'sharp';
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import S3 from '@/libs/aws/client';
import { randomString } from '@/libs/utils';
import { ErrorType } from '@/libs/constant';
import { RestErrorHandler } from '@/libs/rest-error-handler';

type UploadOptions = {
    filename?: string;
    width?: number;
    height?: number;
};

/**
 * Uploads an asset to a specified destination.
 *
 * @param {string} destination - The destination where the asset will be uploaded.
 * @param {File} file - The file to be uploaded.
 * @param {UploadOptions} [options] - Optional upload options.
 * @throws {RestErrorHandler} - Throws a RestHelper object if there was an error during the upload process.
 */
export default async function uploadAsset(destination: string, file: File, options?: UploadOptions): Promise<string | RestErrorHandler> {
    try {
        if (!file) {
            return new RestErrorHandler(ErrorType.BadRequest, 'No file was uploaded');
        }

        if (!destination) {
            return new RestErrorHandler(ErrorType.BadRequest, 'No destination was specified');
        }

        const resizeWidth = options?.width || 64;
        const resizeHeight = options?.height || 64;
        const filename = options?.filename || randomString(32);

        const buffer = await file.arrayBuffer();
        const iconsBuffer = Buffer.from(buffer);

        const newImage = await sharp(iconsBuffer).resize(resizeWidth, resizeHeight).webp().toBuffer();
        if (!newImage) {
            return new RestErrorHandler(ErrorType.InternalServerError, 'The image could not be processed');
        }

        const key = `${destination}/${filename}.webp`;
        await S3.send(
            new PutObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME,
                Key: key,
                Body: newImage
            })
        );

        return `${process.env.ASSET_PREFIX}/${key}`;
    } catch (error) {
        return new RestErrorHandler(ErrorType.InternalServerError, 'The file was not uploaded');
    }
}

export async function deleteAsset(key: string) {
    try {
        await S3.send(
            new DeleteObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME,
                Key: key
            })
        );
    } catch (error) {
        return new RestErrorHandler(ErrorType.InternalServerError, 'The file was not deleted');
    }
}
