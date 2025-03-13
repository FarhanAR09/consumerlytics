export default function mockApiResponse(data, status = 200, delay = 1000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                ok: status >= 200 && status < 300,
                status: status,
                statusText: status === 200 ? "OK" : "Error",
                headers: {
                    "Content-Type": "application/json",
                },
                json: async () => data
            });
        }, delay);
    });
}