import React from "react";
import './Page_content_list.css'
export default function Toc({ title = "Зміст", items = [], className = "" }) {
    if (!items || items.length === 0) return null;

    return (
        <nav className={`toc ${className}`} aria-label={title}>
            <h3 className="toc__title">{title}</h3>
            <ul className="toc__list">
                {items.map(({ id, label, href }) => (
                    <li key={id} className="toc__item">
                        <a className="toc__link" href={href || `#${id}`}>
                            {label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
