export default class Fetcher<T> {
    constructor(readonly url: string, readonly body?: T) {
        this.url = url;
        this.body = body;
    }

    async get(): Promise<Response> {
        return await fetch(this.url, {
            method: 'GET',
            body: JSON.stringify(this.body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async post(): Promise<Response> {
        return await fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(this.body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async put(): Promise<Response> {
        return await fetch(this.url, {
            method: 'PUT',
            body: JSON.stringify(this.body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async delete(): Promise<Response> {
        return await fetch(this.url, {
            method: 'DELETE',
            body: JSON.stringify(this.body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async patch(): Promise<Response> {
        return await fetch(this.url, {
            method: 'PATCH',
            body: JSON.stringify(this.body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
