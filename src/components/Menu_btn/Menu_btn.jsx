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
            >
                <span className="bar" />
                <span className="bar" />
                <span className="bar" />
            </button>

            <nav className={`menu-nav${isOpen ? ' active' : ''}`}>
                <ul>
                    <li><a>Головна сторінка</a></li>
                    <li><a>Випадкова стаття</a></li>
                    <li><a>Профіль користувача</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default Menu;
