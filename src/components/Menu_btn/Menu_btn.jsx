import React, { useState } from 'react';
import './Menu_btn.css';

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
                    <li><a href="/">Головна сторінка</a></li>
                    <li><a>Поточні події</a></li>
                    <li><a>Країни</a></li>
                    <li><a>Добірка тижня</a></li>
                    <li><a>Випадкова стаття</a></li>
                    <li><a>Для подорожі</a></li>
                    <li><a>Збережені маршрути</a></li>
                    <li><a>Портал спільноти</a></li>
                    <li><a>Профіль користувача</a></li>
                    <li><a>Довідка</a></li>
                    <li><a>Сторінка для медіа</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default Menu;
