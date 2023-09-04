import fs from 'fs';
import formidable from 'formidable';
import sharp from 'sharp';
import { PutObjectCommand } from '@aws-sdk/client-s3';
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
 * @param {formidable.File} file - The file to be uploaded.
 * @param {UploadOptions} [options] - Optional upload options.
 * @return {Promise<RestErrorHandler>} - Returns an object with the URL of the uploaded asset, or a RestHelper object if there was an error.
 * @throws {RestErrorHandler} - Throws a RestHelper object if there was an error during the upload process.
 */
export default async function uploadAsset(destination: string, file: formidable.File, options?: UploadOptions): Promise<RestErrorHandler> {
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

        const fileStream = fs.createReadStream(file.filepath);
        const newImage = await sharp(fileStream.path).resize(resizeWidth, resizeHeight).webp().toBuffer();
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

        return { url: `${process.env.ASSET_PREFIX}/${key}` };
    } catch (error) {
        return new RestErrorHandler(ErrorType.InternalServerError, 'The file was not uploaded');
    }
}
