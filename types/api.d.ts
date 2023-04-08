import { ErrorType } from '@libs/constant';

type RestError = {
    code: ErrorType;
    reason: string;
};

type RestPagination<T> = {
    data: T;
    pagination: {
        total: number;
        limit?: number;
        page?: number;
        start?: number;
        end?: number;
        totalPage?: number;
    };
};
