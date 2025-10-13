import PageLayout from "../PageLayout.jsx";
import Toc from '../../components/ToC/ToC.jsx'
import Page_menu from "../../components/Page_menu/Page_menu.jsx";
import CreateArticleForm from "./CreateArticleForm.jsx";

import './CreateArticle.css'

export default function CreateArticle() {
    const tocItems = [
        { id: "createArticle",  label: "Створити статтю" },
    ];

    return (
        <PageLayout>
            <section className={"createArticle-wrap"}>
                <aside className="createArticle__left">
                    <Toc items={tocItems}/>
                </aside>



                <main className="createArticle__content">

                    <h1 className={"createArticle-title"}>Створити статтю</h1>
                    <Page_menu className="long-line" mainTab="Створення статті"/>
                    <section className={"createArticleContent-wrap"}>

                        <p>На цій сторінці ви можете додати власний матеріал, що допоможе іншим мандрівникам.
                            Дотримуйтеся правил оформлення та перевіряйте достовірність інформації.</p>

                        <div className={"createArticleForm-wrap"}>
                            <CreateArticleForm/>
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
