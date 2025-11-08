import { api } from './index';

// Отримати одну статтю за slug
export async function fetchPageBySlug(slug) {
    return api.get(`/pages/slug/${encodeURIComponent(slug)}`);
}

// Отримати список статей (типу пошук)
export async function fetchPageList(params = {}) {
    const query = new URLSearchParams(params);
    return api.get(`/pages?${query.toString()}`);
}

// LIVE SEARCH - те що треба для пошуку
export async function searchPages(q, params = {}) {
    const query = new URLSearchParams({ q, ...params });
    return api.get(`/search?${query.toString()}`);
}

// Створити нову статтю (вимагає токен)
export async function createPage(data) {
    return api.post('/pages', data);
}

// Оновити статтю (вимагає токен)
export async function updatePage(id, data) {
    return api.put(`/pages/${id}`, data);
}

// Видалити статтю (вимагає токен)
export async function deletePage(id) {
    return api.del(`/pages/${id}`);
}

// Отримати всі ревізії сторінки (потрібен токен)
export async function fetchPageRevisions(id) {
    return api.get(`/pages/${id}/revisions`);
}

// Відновити конкретну ревізію (потрібен токен)
export async function restorePageRevision(id, revId) {
    return api.post(`/pages/${id}/restore/${revId}`);
}
