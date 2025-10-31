export function slugify(input, maxLen = 80) {
    if (!input) return '';

    let s = input.trim().toLowerCase();

    if (s.normalize) {
        s = s.normalize('NFKD');
    }

    s = s
        .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
        .replace(/^-+|-+$/g, '')
        .replace(/-{2,}/g, '-');

    if (s.length > maxLen) {
        s = s.slice(0, maxLen).replace(/-+$/g, '');
    }

    return s || 'bez-nazvy';
}
