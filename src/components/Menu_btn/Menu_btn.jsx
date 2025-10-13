import React, { useState } from 'react';
import './Menu_btn.css';
import {Link} from "react-router-dom";

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(open => !open);

    return (
        <div className="menu">
            <button
                type="button"
                className={`menu-btn${isOpen ? ' open' : ''}`}
                onClick={toggle}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
            >
              <span className="menu-icon">
                <span className="bar"/>
                <span className="bar"/>
                <span className="bar"/>
              </span>
            </button>

            <nav className={`menu-nav${isOpen ? ' active' : ''}`}>
                <div className="menu-title">Головне меню</div>
                <ul>
                    <li><Link to="/home">Головна сторінка</Link></li>
                    <li><Link to="">Поточні події</Link></li>
                    <li><Link to="">Країни</Link></li>
                    <li><Link to="">Добірка тижня</Link></li>
                    <li><Link to="">Випадкова стаття</Link></li>
                    <li><Link to="">Для подорожі</Link></li>
                    <li><Link to="">Збережені маршрути</Link></li>
                    <li><Link to="">Портал спільноти</Link></li>
                    <li><Link to="/users/petya">Профіль користувача</Link></li>
                    <li><Link to="/dev">Довідка</Link></li>
                    <li><Link to="/test">Сторінка для медіа</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Menu;
