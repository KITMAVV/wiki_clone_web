import React from 'react';
import './Header.css';
import Menu from '../Menu_btn/Menu_btn.jsx';

const Header = () => {
    return (

        <header className="header">
            <div className="blue-line"/>
            <div className="header__left">

                <Menu />

                <div className="logo">
                    <img src="/logo.png" alt="Logo" draggable="false"/>
                </div>

                <input
                    type="text"
                    className="search-input"
                    placeholder="Пошук у WikiTravel"
                />
                <button className="search-button">Знайти</button>
            </div>


            <div className="header__right">
                <a href="/register">Створити обліковий запис</a>
                <a href="/Login">Увійти</a>
            </div>
        </header>
    );
};

export default Header;
