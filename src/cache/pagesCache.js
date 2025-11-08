const mem = new Map();
const LS_KEY = "pagesCache.v1";
const TTL = 5 * 60 * 1000;

function loadLS() {
    try {
        const raw = localStorage.getItem(LS_KEY);
        if (!raw) return;
        const obj = JSON.parse(raw);
        Object.entries(obj).forEach(([slug, v]) => mem.set(slug, v));
    } catch { /* empty */ }
}
function saveLS() {
    try {
        const obj = {};
        mem.forEach((v, k) => { obj[k] = v; });
        localStorage.setItem(LS_KEY, JSON.stringify(obj));
    } catch { /* ignore */ }
}

export function primePagesCache(page) {
    if (!page?.slug) return;
    mem.set(page.slug, { page, cachedAt: Date.now() });
    saveLS();
}

export function getPageCached(slug) {
    if (!slug) return null;
    const entry = mem.get(slug);
    if (!entry) return null;
    if (Date.now() - (entry.cachedAt || 0) > TTL) return null;
    return entry.page || null;
}

export function setPageCached(page) {
    primePagesCache(page);
}

export function clearPagesCache(slug) {
    if (slug) mem.delete(slug);
    else mem.clear();
    saveLS();
}

try { loadLS(); } catch { /* empty */ }
