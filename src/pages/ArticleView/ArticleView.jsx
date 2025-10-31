import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageLayout from "../PageLayout.jsx";
import Toc from "../../components/ToC/ToC.jsx";
import Page_menu from "../../components/Page_menu/Page_menu.jsx";
import MarkdownViewer from "../../components/MarkdownViewer/MarkdownViewer.jsx";
import ErrorPage from "../ErrorPage/ErrorPage.jsx";

import { fetchPageBySlug } from "../../api/pages.js";

import "./ArticleView.css"

export default function ArticleView() {
    const { slug } = useParams();

    const [page, setPage] = useState(null);
    const [tocItems, setTocItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) return;
        setLoading(true);
        setError(null);

        fetchPageBySlug(slug)
            .then((res) => setPage(res))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, [slug]);

    useEffect(() => {
        if (!page?.content) return;

        const t = setTimeout(() => {
            const root = document.querySelector(".ArticleViewContent-wrap");
            if (!root) return;
            const heads = root.querySelectorAll("h1[id], h2[id], h3[id]");
            const items = Array.from(heads).map((h) => ({
                id: h.id,
                label: h.textContent?.trim() || "",
            }));
            setTocItems(items);
        }, 0);

        return () => clearTimeout(t);
    }, [page?.content]);

    if (loading) {
        return (
            <PageLayout>
                <section className="ArticleView-wrap">
                    <aside className="ArticleView__left">
                        <div>...</div>
                    </aside>

                    <main className="ArticleView__content">
                        <h1 className="ArticleView-title">Завантаження...</h1>

                        <Page_menu className="long-line" mainTab="Завантаження..." showDiscussion={false} showHistory={false} showCode={false}/>

                        <section className="ArticleViewContent-wrap">
                            <div>Завантаження...</div>
                        </section>
                    </main>
                </section>
            </PageLayout>
        );
    }

    if (error) {
        if (error.status === 404) return <ErrorPage status={404}/>;
        if (error.status === 401) return <ErrorPage status={401}/>;
        if (error.status === 403) return <ErrorPage status={403}/>;
        if (!error.status) return <ErrorPage status={0}/>;
        return <ErrorPage status={500} message={error.message}/>;
    }

    if (!page) {
        return (
            <PageLayout>
                <main>
                    Сторінку не знайдено.
                </main>
            </PageLayout>
        );
    }

    const title = page.title || "Без назви";
    const markdown = page.content || "## Порожня стаття";
    // це штуки на випадок якщо сервер повернув данні, але вони пусті


    return (
        <PageLayout>
            <section className="ArticleView-wrap">
                <aside className="ArticleView__left">
                    <Toc items={tocItems} />
                </aside>

                <main className="ArticleView__content">
                    <h1 className="ArticleView-title">{title}</h1>

                    <Page_menu className="long-line" mainTab={title}/>

                    <section className="ArticleViewContent-wrap">
                        <MarkdownViewer markdown={markdown} enableTables />
                    </section>
                </main>
            </section>
        </PageLayout>
    );
}


//ToDo на майбунтє, додати кешування(*я зараз свідомість втрачу, бо хочу спати)
