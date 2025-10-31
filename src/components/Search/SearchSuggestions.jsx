import React from 'react';
import { Link } from 'react-router-dom';
import './search.css';

export default function SearchDropdown({ results = [], onSelect, buildUrl }) {
    if (!results.length) return null;

    const urlFor = buildUrl || ((item) => `/wiki/${item.slug || item.id}`);

    return (
        <ul className="search-dropdown">
            {results.slice(0, 10).map((item, i) => (
                <li key={item.slug || item.id || i} className="search-dropdown__item">
                    <Link to={urlFor(item)} onClick={() => onSelect?.(item)} className="search-dropdown__link">
                        {item.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
