import React, {useEffect, useState} from 'react';
import './Header.css';
import Menu from '../Menu_btn/Menu_btn.jsx';
import Search from "../Search/Search.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useHideOnScroll } from "../../hooks/useHideOnScroll.jsx";
import { useAuth } from "../../auth/AuthContext.jsx";

const Header = () => {
    const hidden = useHideOnScroll();

    const { user, ready, signOut } = useAuth() || {};
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // const [overHeader, setOverHeader] = useState(false);
    // const [overZone, setOverZone] = useState(false);

    // const [forceUnhide, setForceUnhide] = useState(false);

    // useEffect(() => {
    //     if (hidden) setForceUnhide(false);
    // }, [hidden]);
    //
    // const forceShow = overHeader || overZone || forceUnhide;
    //
    // const onHeaderClick = () => {
    //     if (hidden) setForceUnhide(true);
    // };

    const onLogout = async () => {
        setLoading(true);
        try {
            await signOut?.();
            navigate("/");
        } finally {
            setLoading(false);
        }
    };

    const linkLikeBtn = "header-link";
    return (

        <header className={`header ${hidden ? "hide" : ""}`}>
            {/*className={`header ${hidden && !forceShow ? "hide" : ""}`}*/}
            {/*onMouseEnter={() => setOverHeader(true)}*/}
            {/*onMouseLeave={() => setOverHeader(false)}*/}
            {/*onClick={onHeaderClick}>*/}
            <div className="header__left">

                <Menu/>

                <div className="header__logo">
                    <Link to="/home">
                        <img src="/logo.png" alt="Logo" draggable="false"/>
                    </Link>
                </div>

                <Search />
            </div>


            <div className="header__right">
                <Link to="/register" className={linkLikeBtn}>Створити обліковий запис</Link>

                {!ready ? (
                    <span className={linkLikeBtn} style={{visibility: "hidden"}}>…</span>
                ) : !user ? (
                    <Link to="/login" className={linkLikeBtn}>Увійти</Link>
                ) : (
                    <button
                        onClick={onLogout}
                        disabled={loading}
                        className={linkLikeBtn}
                        aria-label="Вийти"
                    >
                        {loading ? "Виходжу…" : "Вийти"}
                    </button>
                )}
            </div>
            {/*<div*/}
            {/*    className="header-reveal-zone"*/}
            {/*    onMouseEnter={() => setOverZone(true)}*/}
            {/*    onMouseLeave={() => setOverZone(false)}*/}
            {/*    aria-hidden="true"*/}
            {/*/>*/}
        </header>
    );
};

export default Header;
