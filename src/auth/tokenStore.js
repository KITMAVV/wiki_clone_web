const KEY_PERM = 'auth_token';
const KEY_TEMP = 'auth_token_session';

export function setToken(token, { remember = true } = {}) {
    if (remember) {
        localStorage.setItem(KEY_PERM, token);
        sessionStorage.removeItem(KEY_TEMP);
    } else {
        sessionStorage.setItem(KEY_TEMP, token);
        localStorage.removeItem(KEY_PERM);
    }
}

export function getToken() {
    return sessionStorage.getItem(KEY_TEMP) || localStorage.getItem(KEY_PERM) || null;
}

export function clearToken() {
    localStorage.removeItem(KEY_PERM);
    sessionStorage.removeItem(KEY_TEMP);
}
