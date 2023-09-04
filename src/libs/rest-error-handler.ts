import { ErrorType } from '@/libs/constant';

export class RestErrorHandler {
    constructor(error: ErrorType, message: string) {
        return {
            error: error,
            message: message
        };
    }
}
