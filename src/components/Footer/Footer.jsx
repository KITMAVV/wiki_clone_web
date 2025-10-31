import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function formatUaDateTime(input) {
    const d = input instanceof Date ? input : new Date(input);
    if (isNaN(d)) return null;

    const time = new Intl.DateTimeFormat('uk-UA', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(d);

    const date = new Intl.DateTimeFormat('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(d);

    return `${time}, ${date}`;
}

const Footer = ({ lastEdited }) => {
    const formatted = lastEdited != null ? formatUaDateTime(lastEdited) : null;
    const showMeta = Boolean(formatted);

    return (
        <footer className="footer">
            <div className="footer__inner">
                {showMeta && (
                    <div className="footer__meta" role="note" aria-live="polite">
                        <p className="footer__edited">
                            Цю сторінку востаннє відредаговано о {formatted}.
                        </p>
                        <p className="footer__license">
                            Текст доступний на умовах ліцензії Creative Commons Attribution-ShareAlike; також можуть діяти додаткові умови.
                            Детальніше див. <Link to="/terms">Умови використання</Link>.
                        </p>
                    </div>
                )}
                <nav aria-label="Футер: навігація по сайту">
                    <ul className="footer__list">
                        <li><Link to="/privacy">Політика конфіденційності</Link></li>
                        <li><Link to="/about">Про WikiTravel</Link></li>
                        <li><Link to="/disclaimer">Відмова від відповідальності</Link></li>
                        <li><Link to="/feedback">Зворотній зв’язок</Link></li>
                        <li><Link to="/code-of-conduct">Кодекс поведінки</Link></li>
                        <li><Link to="/developers">Розробники</Link></li>
                        <li><Link to="/stats">Статистика</Link></li>
                        <li><Link to="/mobile">Мобільний вигляд</Link></li>
                    </ul>
                </nav>

                <div className="footer__logo">
                    <Link to="/home">
                        <img src="/logo.png" alt="Logo" draggable="false"/>
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

// ПРИКЛАД ВИКОРИСТАННЯ для дати(1 - напряму / 2 - PageLayout):
//
// const time = '2025-04-24T14:42:00+03:00';
// ...
// <Footer lastEdited={time} />
//  // немає дати -> надписів немає
// <Footer />
//
// АБО ЯКЩО PageLayout:
//
// <PageLayout lastEdited={time} > ... </PageLayout>
