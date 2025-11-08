import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'smartback:lastNonTechnical';

function getLastNonTechnical() {
    try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

const isWiki = (p) => /^\/wiki\/[^/?#]+/i.test(p);
const isCode = (p) => /^\/w\/code(?:\/|$)/i.test(p);
const isHistory = (p) => /^\/w\/history(?:\/|$)/i.test(p);
const toHistoryPath = (p) => p.replace(/^\/wiki\//i, '/w/history/');

export default function ViewHistoryButton({
                                              className = 'page-menu-tab',
                                              label = 'Переглянути історію',
                                          }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname, search, hash } = location;

    const sourcePath = React.useMemo(() => {
        if (isWiki(pathname)) return pathname;
        if (isCode(pathname)) {
            const saved = getLastNonTechnical();
            return saved && isWiki(saved.pathname) ? saved.pathname : null;
        }
        return null;
    }, [pathname]);

    const targetPath = sourcePath ? toHistoryPath(sourcePath) : null;

    const disabled = isHistory(pathname) || !sourcePath;
    const title = isHistory(pathname)
        ? 'Ви вже на сторінці історії'
        : !sourcePath
            ? 'немає історії'
            : undefined;

    const onClick = () => {
        if (disabled) return;
        const from = pathname + (search || '') + (hash || '');
        navigate(targetPath, { state: { from } });
    };

    return (
        <button
            type="button"
            className={className}
            onClick={onClick}
            aria-disabled={disabled}
            disabled={disabled}
            title={title}
        >
            {label}
        </button>
    );
}

ViewHistoryButton.propTypes = {
    className: PropTypes.string,
    label: PropTypes.node,
};
