import { useMemo, useRef, useEffect } from "react";
import { createTextFormatter} from "../utils/textFormatting.js";

export function useTextFormatter({ getValue, setValue, getEl }) {
    const getValueRef = useRef(getValue);
    const setValueRef = useRef(setValue);
    const getElRef    = useRef(getEl);

    useEffect(() => { getValueRef.current = getValue; }, [getValue]);
    useEffect(() => { setValueRef.current = setValue; }, [setValue]);
    useEffect(() => { getElRef.current    = getEl;    }, [getEl]);

    const setSelection = (start, end) => {
        requestAnimationFrame(() => {
            const el = getElRef.current?.();
            if (!el) return;
            el.focus();
            try { el.setSelectionRange(start, end); } catch {}
        });
    };

    const getSelection = () => {
        const el = getElRef.current?.();
        if (!el) return { a: 0, b: 0 };
        return { a: el.selectionStart, b: el.selectionEnd };
    };

    return useMemo(
        () => createTextFormatter({
            getValue: () => getValueRef.current(),
            setValue: (t) => setValueRef.current(t),
            getSelection,
            setSelection,
        }),
        []
    );
}
