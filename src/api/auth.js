import { api } from './index';
import { setToken, clearToken } from '../auth/tokenStore';

export async function login(email, password, { remember = true } = {}) {
    const data = await api.post('/auth/login', { email, password });
    if (data?.token) setToken(data.token, { remember });
    return data?.user ?? null;
}

export async function register({ name, email, password }, { remember = true } = {}) {
    await api.post('/auth/register', { name, email, password });
    return login(email, password, { remember });
}

export async function me() { return api.get('/auth/me'); }

export async function logout() {
    try { await api.post('/auth/logout', {}); } catch {}
    clearToken();
}
