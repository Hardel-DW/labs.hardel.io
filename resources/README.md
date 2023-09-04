# Information :

This folder contains the resources for the project, so theses resources are not used by the project itself, but are here to help you to create your own project.  
Every resources are public and can be used by anyone.

I will try to maintain and update the resources.

## Databases seed data :

-   minecraft_items.sql : Contains all databases items from minecraft.

## Assets :

-   items_assets.json : Contains all items\blocks from minecraft, optimized for the project with webp extension. The size of the images is 64x64 specifically for the craft page which does not require larger images.

## Upload Assets :

-   I use CloudFlare R2 to store my assets, but you can use any other service to store your assets, Cloudflare R2 is free and has a good speed, based on AWS S3.  
    For simplify the upload of the assets, I use aws-cli, you can find the documentation here : https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html

### How to connect to AWS S3 CLI :

1. Install aws-cli with the documentation.
2. Configure aws-cli with the command : `aws configure`
3. Enter your access key id and secret access key.
4. Enter the region of your bucket, i use Cloudflare so "auto" is the region.
5. Let "NONE" for the output format.
6. If you use Cloudflare R2, Suffix all commands with `--endpoint-url https://<Your R2 ID>.r2.cloudflarestorage.com` to connect to Cloudflare R2 for example: `aws s3 ls --endpoint-url https://<Your R2 ID>.r2.cloudflarestorage.com`
7. With the given assets in resource folder extract the zip and upload the assets with the command : `aws s3 sync <Path to the assets folder> s3://<Your bucket name> --endpoint-url https://<Your R2 ID>.r2.cloudflarestorage.com` `(s3://<Bucket Name>/minecraft/items/)`

### Usefull commands :

-   `aws s3 ls` : List all buckets.
-   `aws s3 ls s3://<bucket name>/<path>` : List all files in the folder.
-   `aws s3 cp <Local Path> s3://<bucket name>/<path>` : Upload a file to the bucket.
-   `aws s3 cp s3://<bucket name>/<path> <Local Path>` : Download a file from the bucket.
-   `aws s3 rm s3://<bucket name>/<path>` : Delete a file from the bucket.
-   `aws s3 rm s3://<bucket name>/<path> --recursive` : Delete a folder from the bucket.
-   `aws s3 sync <Local Path> s3://<bucket name>/<path>` : Upload a folder to the bucket.
-   `aws s3 sync s3://<bucket name>/<path> <Local Path>` : Download a folder from the bucket.
