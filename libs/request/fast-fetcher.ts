import { mutate } from 'swr';

export default class FastFetcher {
    url: string;
    method: string;
    body: any;
    successMessage: string = 'The request was successfully processed.';
    errorMessage: string = 'An Error occurred while processing your request';
    mutateUrl?: Array<string>;
    headers: HeadersInit = { 'Content-Type': 'application/json' };
    formData?: FormData;

    constructor(url: string, method: string, successMessage?: string, errorMessage?: string) {
        this.method = method;
        this.url = url;
        if (successMessage) {
            this.successMessage = successMessage;
        }

        if (errorMessage) {
            this.errorMessage = errorMessage;
        }
    }

    setBody<T>(body: T) {
        this.body = body;
        return this;
    }

    setFormData(data: { [key: string]: any }) {
        const formData = new FormData();

        Object.keys(data).map((key: string) => {
            formData.append(key, data[key]);
        });

        this.headers = {};
        this.formData = formData;
        return this;
    }

    appendMutateUrl(url: string) {
        if (!this.mutateUrl) {
            this.mutateUrl = [];
        }

        this.mutateUrl.push(url);
        return this;
    }

    private bodyParser() {
        if (this.formData) {
            return this.formData;
        } else if (this.body) {
            return JSON.stringify(this.body);
        }
    }

    async fetching<T>(): Promise<T> {
        return new Promise((resolve, reject) => {
            fetch(this.url, {
                method: this.method,
                headers: this.headers,
                body: this.bodyParser()
            })
                .then((response) => {
                    const data = response.json();
                    if (!response.ok) {
                        reject(data);
                    } else {
                        this.mutateUrl && this.mutateUrl.map((url) => mutate(url));
                        resolve(data);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}
