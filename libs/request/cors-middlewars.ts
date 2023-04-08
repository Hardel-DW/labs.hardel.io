import cors, { CorsOptions, CorsOptionsDelegate } from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * It takes a middleware function and an options object, and returns a function that takes a request
 * and a response, and returns a promise that resolves to the result of the middleware function
 * @param middleware - The middleware function to be called.
 * @returns A promise.
 */
function initMiddleware(middleware: typeof cors) {
    return (req: NextApiRequest, res: NextApiResponse, options?: CorsOptions | CorsOptionsDelegate) =>
        new Promise((resolve, reject) => {
            middleware(options)(req, res, (result: Error | unknown) => {
                if (result instanceof Error) {
                    return reject(result);
                }

                return resolve(result);
            });
        });
}

const NextCors = initMiddleware(cors);
export default NextCors;
