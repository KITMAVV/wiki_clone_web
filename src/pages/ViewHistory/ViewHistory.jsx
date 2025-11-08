import React from "react";
import { useParams } from "react-router-dom";

import PageLayout from "../PageLayout.jsx";
import Toc from "../../components/ToC/ToC.jsx";
import Page_menu from "../../components/Page_menu/Page_menu.jsx";
import DataTable from "../../components/Table_master/Table_master.jsx";

import { getPageCached } from "../../cache/pagesCache.js";
import { fetchPageBySlug } from "../../api/pages.js";
import { fetchPageRevisions } from "../../api/pages.js";

import "../shared.css";
import "./ViewHistory.css";

export default function ViewHistory() {
    const { slug } = useParams();

    const [pageId, setPageId] = React.useState(null);
    const [loading, setLoading] = React.useState(!!slug);
    const [error, setError] = React.useState(null);
    const [rows, setRows] = React.useState([]);

    const tocItems = React.useMemo(() => [{ id: "history", label: "Історія змін" }], []);

    React.useEffect(() => {
        let cancelled = false;

        async function resolvePageId() {
            if (!slug) {
                setLoading(false);
                return;
            }
            setError(null);
            setLoading(true);
            try {
                const cached = getPageCached?.(slug);
                if (cached?.id) {
                    if (!cancelled) setPageId(cached.id);
                    return;
                }
                const res = await fetchPageBySlug(slug);
                const page = res?.data ?? res;
                if (!page?.id) throw new Error("Page not found");
                if (!cancelled) setPageId(page.id);
            } catch (e) {
                if (!cancelled) setError(e);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        resolvePageId();
        return () => { cancelled = true; };
    }, [slug]);

    React.useEffect(() => {
        let cancelled = false;
        if (!pageId) return;

        async function loadRevisions() {
            setError(null);
            setLoading(true);
            try {
                const res = await fetchPageRevisions(pageId);
                const list = Array.isArray(res?.data) ? res.data : (res ?? []);

                const asc = [...list].sort((a, b) => {
                    const da = new Date(a?.created_at || 0).getTime();
                    const db = new Date(b?.created_at || 0).getTime();
                    return da - db;
                });

                const prepared = asc.map((r, idx) => ({
                    num: idx + 1,
                    datetime: formatDateTime(r.created_at || r.updated_at),
                    summary: r.summary ?? "-",
                    short: makeShort(r.diff ?? r.summary ?? "-"),
                    author: r.editor_id ?? "-",
                    minor: r.is_minor ? "Так" : "Ні",
                }));

                if (!cancelled) setRows(prepared);
            } catch (e) {
                if (!cancelled) setError(e);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        loadRevisions();
        return () => { cancelled = true; };
    }, [pageId]);

    const columns = React.useMemo(() => ([
        { key: "num",      title: "№",                   style: { width: 60,  textAlign: "center" } },
        { key: "datetime", title: "Дата та час зміни" },
        { key: "summary",  title: "Тип зміни",           style: { width: 220 } },
        { key: "short",    title: "Короткий опис",       style: { width: 220 } },
        { key: "author",   title: "Автор",               style: { width: 100 } },
        { key: "minor",    title: "Проста правка",       style: { width: 140 } },
    ]), []);

    return (
        <PageLayout>
            <section className="shared-wrap">
                <aside className="shared__left">
                    <Toc items={tocItems} />
                </aside>

                <main className="shared__content">
                    <h1 className="shared-title" id="history">Історія змін</h1>
                    <Page_menu className="long-line" active={['main', 'history']} />

                    <section className="history-section">
                            <>
                                {loading && <div>Завантаження…</div>}
                                {error && <div className="history-error">Помилка: {String(error?.message || "невідома")}</div>}
                                {!loading && !error && <DataTable columns={columns} rows={rows} />}
                            </>
                    </section>
                </main>
            </section>
        </PageLayout>
    );
}

function formatDateTime(v) {
    if (!v) return "—";
    const d = new Date(v);
    if (isNaN(+d)) return String(v);
    const pad = n => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function makeShort(value, max = 120) {
    if (value == null) return "—";
    const s = String(value).replace(/\s+/g, " ").trim();
    if (!s) return "—";
    return s.length <= max ? s : s.slice(0, max) + "…";
}
