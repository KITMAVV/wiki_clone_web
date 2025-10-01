import React from 'react';
import './Header.css';
import Menu from '../Menu_btn/Menu_btn.jsx';
import {Link} from "react-router-dom";
import {useHideOnScroll} from "../../hooks/useHideOnScroll.jsx";

const Header = () => {
    const hidden = useHideOnScroll();
    return (

        <header className={`header ${hidden ? "hide" : ""}`}>
            <div className="header__left">

                <Menu/>

                <div className="logo">
                    <Link to="/home">
                        <img src="/logo.png" alt="Logo" draggable="false"/>
                    </Link>
                </div>

                <input
                    type="text"
                    className="search-input"
                    placeholder="Пошук у WikiTravel"
                />
                <button className="search-button">Знайти</button>
            </div>


            <div className="header__right">
                <Link to="/register">Створити обліковий запис</Link>
                <Link to="/login">Увійти</Link>
            </div>
        </header>
    );
};

export default Header;
