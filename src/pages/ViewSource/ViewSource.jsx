import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '../PageLayout.jsx';
import Toc from '../../components/ToC/ToC.jsx';
import Page_menu from '../../components/Page_menu/Page_menu.jsx';

import '../shared.css';
import './ViewSource.css';

export default function ViewSource() {
    const navigate = useNavigate();
    const location = useLocation();

    const [cached] = React.useState(() => ({
        html: location.state?.html ?? '',
        title: location.state?.title ?? 'Без назви',
        from:  location.state?.from  ?? null,
        mainTab: location.state?.mainTab ?? 'Стаття',
    }));

    const tocItems = [
        { id: 'Title', label: 'Верх сторінки' },
    ];

    if (!cached.html) {
        return (
            <PageLayout>
                <section className="shared-wrap shared-wrap--single">
                    <main className="shared__content">
                        <h1 className="shared-title">Перегляд коду сторінки</h1>

                        <p className="source-empty">
                            Немає даних для відображення. Відкрийте будь-яку сторінку та натисніть «Переглянути код».
                        </p>
                        <button className="source__button" onClick={() => (cached.from ? navigate(cached.from) : navigate(-1))}>
                            Повернутися назад
                        </button>
                    </main>
                </section>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <section className="shared-wrap">
                <aside className="shared__left">
                    <Toc items={tocItems} />
                </aside>

                <main className="shared__content">
                    <h1 className="shared-title" id="Title">Перегляд коду: {cached.title}</h1>

                    <Page_menu className="long-line" mainTab={cached.mainTab} active={['main', 'code']}/>

                    <label className="source-hint" htmlFor="source-textarea">
                        Ви можете переглядати та скопіювати код цієї сторінки.
                    </label>

                    <h2 className="visually-hidden">Код сторінки</h2>

                    <textarea
                        id="source-textarea"
                        className="source-textarea"
                        readOnly
                        spellCheck={false}
                        wrap="off"
                        value={cached.html}
                    />
                </main>
            </section>
        </PageLayout>
    );
}
