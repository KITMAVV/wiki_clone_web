import * as React from "react";
import { fetchPageBySlug } from "../api/pages";
import { getPageCached, setPageCached, primePagesCache } from "../cache/pagesCache";

export default function usePageBySlug(slug, opts = {}) {
    const { initialPage = null } = opts;

    const [page, setPage] = React.useState(() => {
        return initialPage || getPageCached(slug) || null;
    });
    const [loading, setLoading] = React.useState(!page);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        if (initialPage?.slug) {
            primePagesCache(initialPage);
        }
    }, [initialPage]);

    React.useEffect(() => {
        if (!slug) return;

        let cancelled = false;
        setError(null);
        const cached = getPageCached(slug);
        if (cached && !page) setPage(cached);

        async function run() {
            try {
                if (!cached) setLoading(true);
                const res = await fetchPageBySlug(slug);
                const fresh = res?.data ?? res;
                if (cancelled || !fresh) return;

                const changed =
                    !page ||
                    !page.updated_at ||
                    !fresh.updated_at ||
                    String(page.updated_at) !== String(fresh.updated_at);

                if (changed) {
                    setPage(fresh);
                    setPageCached(fresh);
                }
            } catch (e) {
                if (!cancelled) setError(e);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        run();
        return () => { cancelled = true; };
    }, [slug]);

    return { page, loading, error };
}
