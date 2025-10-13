import { useEffect, useRef, useState } from "react";

export function useDraft(key, initial = {}) {
    const isFirst = useRef(true);
    const [values, setValues] = useState(() => {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : initial;
        } catch {
            return initial;
        }
    });

    useEffect(() => {
        if (isFirst.current) { isFirst.current = false; return; }
        const t = setTimeout(() => {
            try {
                localStorage.setItem(key, JSON.stringify(values));
                localStorage.setItem(`${key}:ts`, String(Date.now()));
            } catch {console.error()}
        }, 400);
        return () => clearTimeout(t);
    }, [key, values]);

    const clearDraft = () => {
        try {
            localStorage.removeItem(key);
            localStorage.removeItem(`${key}:ts`);
        } catch {console.error()}
    };

    return { values, setValues, clearDraft };
}
