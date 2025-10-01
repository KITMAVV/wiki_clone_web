const API_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, '') || '';

export function makeClient(getToken) {
    async function request(path, { method = 'GET', headers, body } = {}) {
        const token = getToken?.();
        const res = await fetch(`${API_URL}${path}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...(headers || {}),
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        const text = await res.text();
        let data = null;
        try { data = text ? JSON.parse(text) : null; } catch { data = text || null; }

        if (!res.ok) {
            const err = new Error((data && (data.message || data.error)) || `HTTP ${res.status}`);
            err.status = res.status;
            err.payload = data;
            throw err;
        }
        return data;
    }

    return {
        get:  (path)       => request(path, { method: 'GET' }),
        post: (path, body) => request(path, { method: 'POST', body }),
        put:  (path, body) => request(path, { method: 'PUT', body }),
        del:  (path)       => request(path, { method: 'DELETE' }),
    };
}
