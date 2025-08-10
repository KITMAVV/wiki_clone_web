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
                    <li><a href="/">Головна сторінка</a></li>  {/* - Козаче, де роутінг?(буде потім)*/}
                    <li><a>Випадкова стаття</a></li>
                    <li><a>Профіль користувача</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default Menu;
