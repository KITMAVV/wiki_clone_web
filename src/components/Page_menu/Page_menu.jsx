import React from "react";
import './Page_menu.css'
import ViewSourceButton from "../ViewSourceButton/ViewSourceButton.jsx";

const Page_menu = ({ className = "", mainTab = "Головна", showDiscussion = true, showRead = true, showCode = true, showHistory = true, active = ['main','read'], }) => {
    const isActive = (name) =>
        Array.isArray(active) ? active.includes(name) : active === name;

    const tabCls = (name) => `page-menu-tab${isActive(name) ? " active" : ""}`;

    return (
        <div className={`page-menu-tools ${className}`}>
            <div className="page-menu-tabs-left">
                <a href="#" className={tabCls("main")}>{mainTab}</a>
                {showDiscussion && <a href="#" className={tabCls("discussion")}>Обговорення</a>}
            </div>
            <div className="page-menu-tabs-right">
                {showRead && <a href="#" className={tabCls("read")}>Читати</a>}
                {showCode && <ViewSourceButton className={tabCls("code")} label="Переглянути код" mainTab={mainTab} />}
                {showHistory && <a href="#" className={tabCls("history")}>Переглянути історію</a>}
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


// ПРИКЛАД ВИКОРИСТАННЯ компонента(*за замовчуванням всі кнопки увімкнуті):
// <Page_menu className="long-line" mainTab="Стаття" showDiscussion={false} showRead={false} showCode={false} showHistory={false} active={['main', 'read']}  />
// active={['main', 'read']} - можна також щось одне, наприклад active="code" або active={'code'}. Active це те які кнопки мають прочерк знизу
