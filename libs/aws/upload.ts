import formidable from 'formidable';
import fs from 'fs';
import sharp from 'sharp';
import RestHelper from '@libs/request/rest-helper';
import { ErrorType } from '@libs/constant';
import S3 from '@libs/aws/client';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { randomString } from '@libs/utils';
import { RestError } from '@definitions/api';

type UploadOptions = {
    filename?: string;
    width?: number;
    height?: number;
};

export type AssetUploadOutput = {
    url: string;
    width: number;
    height: number;
    filename: string;
};

export default async function uploadAsset(
    destination: string,
    file: formidable.File,
    options?: UploadOptions
): Promise<RestError | { url: string }> {
    try {
        if (file && destination) {
            const resizeWidth = options?.width || 64;
            const resizeHeight = options?.height || 64;
            const filename = options?.filename || randomString(32);

            const fileStream = fs.createReadStream(file.filepath);
            const newImage = await sharp(fileStream.path).resize(resizeWidth, resizeHeight).webp().toBuffer();
            if (!newImage) {
                return new RestHelper().sendError(ErrorType.InternalServerError, 'The image could not be processed');
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
        } else {
            return new RestHelper().sendError(ErrorType.InternalServerError, 'File or Destination is missing');
        }
    } catch (error) {
        return new RestHelper().sendError(ErrorType.InternalServerError, 'The file was not uploaded');
    }
}
