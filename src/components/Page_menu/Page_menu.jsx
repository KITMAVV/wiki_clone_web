import React from "react";
import './Page_menu.css'
import ViewHistoryButton from "../ViewHistoryButton/ViewHistoryButton.jsx";
import ViewSourceButton from "../ViewSourceButton/ViewSourceButton.jsx";
import useSmartBack from "../../hooks/useSmartBack.js";
import DropInstrumentsButton from "../DropInstrumentsButton/DropInstrumentsButton.jsx";

const Page_menu = ({
                       className = "",
                       mainTab = "Головна",
                       showDiscussion = true,
                       showRead = true,
                       showCode = true,
                       showHistory = true,
                       active = ['main', 'read'],
                   }) => {

    const smartBack = useSmartBack();

    const isActive = (name) =>
        Array.isArray(active) ? active.includes(name) : active === name;

    const tabCls = (name) => `page-menu-tab${isActive(name) ? " active" : ""}`;

    const handleReadClick = (e) => {
        e.preventDefault();
        smartBack();
    };


    return (
        <div className={`page-menu-tools ${className}`}>
            <button
                type="button"
                className="page-menu-goback-btn"
                aria-label="Назад"
                title="Назад"
                onClick={smartBack}
            >

                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                >
                    <path
                        fill="currentColor"
                        d="M5 1H4L0 5L4 9H5V6H11C12.6569 6 14 7.34315 14 9C14 10.6569 12.6569 12 11 12H4V14H11C13.7614 14 16 11.7614 16 9C16 6.23858 13.7614 4 11 4H5V1Z"
                    />
                </svg>
            </button>

            <div className="page-menu-tabs-left">
                <a href="#" className={tabCls("main")}>{mainTab}</a>
                {showDiscussion && <a href="#" className={tabCls("discussion")}>Обговорення</a>}
            </div>
            <div className="page-menu-tabs-right">

                {showRead && <button type="button" className={tabCls("read")} onClick={handleReadClick}>Читати</button>}
                {showCode && <ViewSourceButton className={tabCls("code")} label="Переглянути код" mainTab={mainTab}/>}
                {showHistory && <ViewHistoryButton className={tabCls('history')} label="Переглянути історію" />}

                <DropInstrumentsButton/>
            </div>
        </div>
    );
};

export default Page_menu;


// ПРИКЛАД ВИКОРИСТАННЯ компонента(*за замовчуванням всі кнопки увімкнуті):
// <Page_menu className="long-line" mainTab="Стаття" showDiscussion={false} showRead={false} showCode={false} showHistory={false} active={['main', 'read']}  />
// active={['main', 'read']} - можна також щось одне, наприклад active="code" або active={'code'}. Active це те які кнопки мають прочерк знизу
