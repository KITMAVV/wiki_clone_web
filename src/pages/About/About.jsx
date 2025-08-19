import PageLayout from '../PageLayout.jsx';
import Toc from '../../components/Page_content/Page_content.jsx'

import './About.css'

export default function About() {
    // затичка від chatgpt, не звертай уваги
    const tocItems = [
        { id: "Wiki",  label: "WikiTravel" },
        { id: "main",    label: "Основні відомості" },
        { id: "usage", label: "Використання" },
    ];
    return (
        <PageLayout>
            <section className={"about-wrap"}>
                <aside className="about__left">
                    <Toc items={tocItems}/>
                </aside>
                <main className="about__content">
                    <h2 id="europe">Європа</h2>
                    <h2 id="asia">Азія</h2>
                </main>
            </section>
        </PageLayout>
    );
}
