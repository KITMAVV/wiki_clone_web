import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchDropdown from './SearchSuggestions.jsx';
import {searchPages} from "../../api/pages.js";
import './search.css';

export default function Search(props) {
    const { placeholder = 'Пошук у WikiTravel', buttonText = 'Знайти', classNameInput = 'search-input', classNameButton = 'search-button', className = '', } = props;

    const [term, setTerm] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const abortRef = useRef(null);
    const debounceRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const pageUrl = (item) => `/wiki/${item.slug || item.id}`;

    useEffect(() => {
        if (!term.trim()) {
            setResults([]);
            setError('');
            abortRef.current?.abort?.();
            clearTimeout(debounceRef.current);
            return;
        }
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(async () => {
            abortRef.current?.abort?.();
            const controller = new AbortController();
            abortRef.current = controller;
            setError('');
            try {
                const data = await searchPages(term, { page: 1, per_page: 10, signal: controller.signal });
                const items = Array.isArray(data) ? data : (data?.data ?? []);
                setResults(items.map(p => ({ title: p.title, slug: p.slug, id: p.id })));
            } catch (e) {
                if (e.name !== 'AbortError') {
                    setError(e?.payload?.message || e.message || 'Помилка пошуку');
                    setResults([]);
                }
            }
        }, 250);
        return () => clearTimeout(debounceRef.current);
    }, [term]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (results.length > 0) navigate(pageUrl(results[0]));
    };

    useEffect(() => {
        setResults([]);
    }, [location.pathname]);

    return (
        <form onSubmit={handleSubmit} className={`search ${className}`.trim()}>
            <input
                type="text"
                className={classNameInput}
                placeholder={placeholder}
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                aria-label="Поле пошуку"
                autoComplete="off"
            />
            <button type="submit" className={classNameButton} aria-label="Виконати пошук">
                {buttonText}
            </button>

            {error && <div className="search-error">{error}</div>}

            <SearchDropdown results={results} buildUrl={pageUrl} />
        </form>
    );
}
