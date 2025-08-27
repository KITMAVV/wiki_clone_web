import React from "react";
import './Page_menu.css'

const Page_menu = ({ className = "", mainTab = "Головна", showDiscussion = true, showRead = true, showCode = true, showHistory = true, }) => {
    return (
        <div className={`page-menu-tools ${className}`}>
            <div className="page-menu-tabs-left">
                <a href="#" className="page-menu-tab active">{mainTab}</a>
                {showDiscussion && (
                    <a href="#" className="page-menu-tab">Обговорення</a>
                )}
            </div>
            <div className="page-menu-tabs-right">
                {showRead && (
                    <a href="#" className="page-menu-tab active">Читати</a>
                )}
                {showCode && (
                    <a href="#" className="page-menu-tab">Переглянути код</a>
                )}
                {showHistory && (
                    <a href="#" className="page-menu-tab">Переглянути історію</a>
                )}
                <button
                    className="page-menu-tools-btn"
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded="false"
                >
                    Інструменти ▾
                </button>
            </div>
        </div>
    );
};

export default Page_menu;


// Приклад використання компонента(*за замовчуванням всі кнопки увімкнуті):
// <Page_menu className="long-line" mainTab="Стаття" showDiscussion={false} showRead={false} showCode={false} showHistory={false} />
