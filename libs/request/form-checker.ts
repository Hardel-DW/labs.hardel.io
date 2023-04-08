import { RestError } from '@definitions/api';
import { ErrorType } from '@libs/constant';
import { SafeNumber } from '@definitions/global';

class FormValidator {
    getPagination(limit: SafeNumber, page: SafeNumber, count: number) {
        const take = limit ? Number(limit) : undefined;
        const skip = page && take ? (Number(page) + 1) * Number(take) : 0;

        return {
            total: count,
            limit: take,
            page: page ? Number(page) : undefined,
            start: skip,
            end: take ? skip + take : undefined,
            totalPage: take ? Math.ceil(count / take) : undefined
        };
    }

    sendError(code: ErrorType, reason: string) {
        return {
            code: code,
            reason: reason
        } as RestError;
    }
}

export default FormValidator;
