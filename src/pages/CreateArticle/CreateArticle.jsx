import {useState} from "react";
import {useNavigate} from "react-router-dom";
import PageLayout from "../PageLayout.jsx";
import Toc from '../../components/ToC/ToC.jsx'
import Page_menu from "../../components/Page_menu/Page_menu.jsx";
import CreateArticleForm from "./CreateArticleForm.jsx";

import './CreateArticle.css'

import {createPage} from "../../api/pages.js";

export default function CreateArticle() {
    const tocItems = [
        { id: "createArticle",  label: "Створити статтю" },
    ];

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const nav = useNavigate();

    const handleSubmit = async ({ title, body, category }) => {
        if (!title?.trim() || !body?.trim()) {
            setError("Вкажіть назву і текст статті");
            return false;
        }
        setError(null);
        setSubmitting(true);
        try {
            const res = await createPage({
                title: title.trim(),
                content: body,
                status: "published",
                type: (category?.trim() || "article").slice(0, 32),
            });

            const to = res?.slug
                ? `/wiki/${res.slug}`
                : res?.id
                    ? `/id/${res.id}`
                    : "/";
            nav(to);
            return true;
        } catch (e) {
            const msg =
                (e?.payload && (e.payload.message || e.payload.error)) ||
                e?.message ||
                "Помилка під час створення статті";
            setError(msg);
            return false;
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <PageLayout>
            <section className={"createArticle-wrap"}>
                <aside className="createArticle__left">
                    <Toc items={tocItems}/>
                </aside>



                <main className="createArticle__content">

                    <h1 id={"createArticle"} className={"createArticle-title"}>Створити статтю</h1>
                    <Page_menu className="long-line" mainTab="Створення статті"/>
                    <section className={"createArticleContent-wrap"}>

                        <p>На цій сторінці ви можете додати власний матеріал, що допоможе іншим мандрівникам.
                            Дотримуйтеся правил оформлення та перевіряйте достовірність інформації.</p>

                        <div className={"createArticleForm-wrap"}>
                            <CreateArticleForm onSubmit={handleSubmit} submitting={submitting} />




                            {error && <div className="text-red-600 mt-3">{error}</div>}



                        </div>

                        <div className={"createArticleForm-tips"}>
                            <p>Поради авторам</p>
                            <ul>
                                <li>Використовуйте унікальні фото та власний досвід.</li>
                                <li>Уникайте рекламних текстів.</li>
                                <li>Перевіряйте актуальність цін, графіків роботи та адрес.</li>
                                <li>Пишіть так, щоб текст був зрозумілий навіть новачку у подорожах.</li>
                            </ul>
                        </div>
                    </section>

                </main>
            </section>
        </PageLayout>
    )
}


// На майбутнє: На бекегді є логіка draft'ів(щоб зберігати їх) але я поки що залишу як є(бо по дизайну не хочу думати). Локальних драфтів досить
