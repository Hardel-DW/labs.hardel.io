const fetcher = async (url: string) => {
    const request = await fetch(url);
    if (!request.ok) {
        throw new Error('Request failed');
    }

    return await request.json();
};

export default fetcher;
