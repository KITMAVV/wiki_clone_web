import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PageLayout from "../PageLayout.jsx";
import Toc from "../../components/ToC/ToC.jsx";
import Page_menu from "../../components/Page_menu/Page_menu.jsx";
import MarkdownViewer from "../../components/MarkdownViewer/MarkdownViewer.jsx";
import "./CreateArticle.css";

export default function PreviewCreatedArticle() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [data] = useState(() => {
        if (state?.markdown) return state;
        const raw = sessionStorage.getItem("articlePreviewDraft");
        return raw ? JSON.parse(raw) : null;
    });

    const [tocItems, setTocItems] = useState([]);

    useEffect(() => {
        if (!data) navigate("/create-article");
    }, [data, navigate]);


    useEffect(() => {
        if (!data?.markdown) return;

        const t = setTimeout(() => {
            const root = document.querySelector(".createArticleContent-wrap");
            if (!root) return;
            const heads = root.querySelectorAll("h1[id], h2[id], h3[id]");
            const items = Array.from(heads).map(h => ({
                id: h.id,
                label: h.textContent?.trim() || "",
            }));
            setTocItems(items);
        }, 0);
        return () => clearTimeout(t);
    }, [data?.markdown]);

    if (!data) return null;

    return (
        <PageLayout>
            <section className="createArticle-wrap">
                <aside className="createArticle__left">
                    <Toc items={tocItems} />
                </aside>

                <main className="createArticle__content">
                    <h1 className="createArticle-title">
                        {data.title || "Тут буде назва статті"}
                    </h1>
                    <Page_menu className="long-line" mainTab="Створення статті" showDiscussion={false}  showHistory={false} />
                    <section className="createArticleContent-wrap">
                        <MarkdownViewer markdown={data.markdown} enableTables />
                    </section>
                </main>
            </section>
        </PageLayout>
    );
}
