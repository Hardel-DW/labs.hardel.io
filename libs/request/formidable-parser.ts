import formidable from 'formidable';
import { NextApiRequest } from 'next';

export default async function formidableParser(req: NextApiRequest): Promise<{
    fields: formidable.Fields;
    files: formidable.Files;
}> {
    const form = new formidable.IncomingForm();

    return await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err);
                return;
            }

            resolve({ fields, files });
        });
    });
}
