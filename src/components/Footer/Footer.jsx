import React from 'react';
import './Footer.css';
import {Link} from "react-router-dom";

const Footer = () => {
    return (

        <footer className="footer">
            <div className="footer_buttons">
                <Link to="">Політика конфіденційності</Link>
                <Link to="/about">Про WikiTravel</Link>
                <Link to="">Відмова від відповідальності</Link>
                <Link to="">Зворотній зв’язок</Link>
                <Link to="">Кодекс поведінки</Link>
                <Link to="">Розробники</Link>
                <Link to="">Статистика</Link>
                <Link to="">Мобільний вигляд</Link>
            </div>
        </footer>
    );
};

export default Footer;
