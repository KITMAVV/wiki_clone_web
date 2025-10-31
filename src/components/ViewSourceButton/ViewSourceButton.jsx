import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { slugify } from '../../utils/slugify.js';

export default function ViewSourceButton({ className = 'page-menu-tab', label = 'Переглянути код', title, mainTab, }) {
    const navigate = useNavigate();
    const location = useLocation();

    const onClick = () => {
        if (location.pathname.startsWith('/w/') && location.pathname.includes('/code/')) {
            return;
        }

        const html = document.documentElement.outerHTML;
        const safeTitle = title || document.title || 'Без назви';
        const slug = slugify(safeTitle);
        const from = location.pathname + location.search + location.hash;

        navigate(`/w/code/${encodeURIComponent(slug)}`, {
            state: { html, title: safeTitle, from, mainTab: mainTab ?? 'Стаття', },
        });
    };

    return (
        <button type="button" className={className} onClick={onClick}>
            {label}
        </button>
    );
}
