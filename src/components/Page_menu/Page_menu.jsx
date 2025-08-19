import React from "react";
import './Page_menu.css'

const Page_menu = () => {
    return (

        <div className="page-menu-tools">
            <div className="page-menu-tabs-left">
                <a href="#" className="page-menu-tab active">Головна</a> {/*ToDo актив штука настроить скрипт джава пон*/}
                <a href="#" className="page-menu-tab">Обговорення</a>
            </div>
            <div className="page-menu-tabs-right">
                <a href="#" className="page-menu-tab active">Читати</a>
                <a href="#" className="page-menu-tab">Переглянути код</a>
                <a href="#" className="page-menu-tab">Переглянути історію</a>
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
