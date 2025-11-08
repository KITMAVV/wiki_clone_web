import {useEffect, useRef, useState} from "react";
import { useParams } from "react-router-dom";

import PageLayout from "../PageLayout.jsx";
import Toc from "../../components/ToC/ToC.jsx";
import Page_menu from "../../components/Page_menu/Page_menu.jsx";
import MarkdownViewer from "../../components/MarkdownViewer/MarkdownViewer.jsx";
import ErrorPage from "../ErrorPage/ErrorPage.jsx";


import usePageBySlug from "../../hooks/usePageBySlug.js";
import '../shared.css'

export default function ArticleView() {
    const { slug } = useParams();

    const { page, loading, error } = usePageBySlug(slug);
    const [tocItems, setTocItems] = useState([]);
    const contentRef = useRef(null);


    useEffect(() => {
        if (!page?.content) return;

        const raf = requestAnimationFrame(() => {
            const root = contentRef.current;
            if (!root) return;

            const heads = root.querySelectorAll("h1[id], h2[id], h3[id]");
            const items = Array.from(heads).map(h => ({
                id: h.id,
                label: h.textContent?.trim() || "",
            }));
            setTocItems(items);
        });

        return () => cancelAnimationFrame(raf);
    }, [page?.content]);

    if (loading) {
        return (
            <PageLayout>
                <section className="shared-wrap">
                    <aside className="shared__left">
                        <div>...</div>
                    </aside>

                    <main className="shared__content">
                        <h1 className="shared-title">Завантаження...</h1>

                        <Page_menu className="long-line" mainTab="Завантаження..." showDiscussion={false} showHistory={false} showCode={false}/>

                        <section style={{ width: "970px", marginTop: "30px", }}>
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
        return <ErrorPage status={500} message={error?.message} />;
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
    const lastEdited = page?.updated_at || null;



    return (
        <PageLayout lastEdited={lastEdited}>
            <section className="shared-wrap">
                <aside className="shared__left">
                    <Toc items={tocItems} />
                </aside>

                <main className="shared__content">
                    <h1 className="shared-title">{title}</h1>

                    {/*<Page_menu className="long-line" mainTab={title}/>*/}
                    <Page_menu className="long-line" mainTab="Стаття"/>

                    <section ref={contentRef} style={{width: "970px", marginTop: "15px",}}>
                        <p style={{fontWeight: 400, marginBottom: "20px",}}> Матеріал із Wikitravel — вільної енциклопедії подорожей </p>
                        <MarkdownViewer markdown={markdown} enableTables/>
                    </section>
                </main>
            </section>
        </PageLayout>
    );
}
