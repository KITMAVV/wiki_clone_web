import { useEffect, useRef, useState } from "react";
import "./ImageInsertModal.css";

export default function ImageInsertModal({
                                             open,
                                             onClose,
                                             onInsert,
                                             initial = {},
                                         }) {
    const [src, setSrc] = useState(initial.src || "");
    const [alt, setAlt] = useState(initial.alt || "");
    const [align, setAlign] = useState(initial.align || "left");
    const [wrap, setWrap] = useState(Boolean(initial.wrap));
    const [plain, setPlain] = useState(Boolean(initial.plain));
    const [size, setSize] = useState(initial.size || "");
    const urlRef = useRef(null);

    const normalizeSize = (input) => {
        if (!input) return null;
        const t = String(input).trim().toLowerCase();
        if (t.endsWith("%")) return t;
        if (t.endsWith("px")) return t;
        if (!Number.isNaN(Number(t))) return `${t}%`;
        return t;
    };

    const buildImageMarkdown = ({ src, alt = "", align = "left", wrap = false, size = null, plain = false }) => {
        const tokens = [];
        if (align === "left" || align === "center" || align === "right") tokens.push(align);
        if (wrap && align !== "center") tokens.push("wrap");
        if (plain) tokens.push("plain");
        if (size) tokens.push(`size=${size}`);
        const title = tokens.length ? ` "${tokens.join("; ")}"` : "";
        return `![${alt}](${src}${title})`;
    };

    useEffect(() => {
        if (!open) return;
        setSrc(initial.src || "");
        setAlt(initial.alt || "");
        setAlign(initial.align || "left");
        setWrap(Boolean(initial.wrap));
        setPlain(Boolean(initial.plain));
        setSize(initial.size || "");
        setTimeout(() => urlRef.current?.focus(), 0);
    }, [open]);

    const submit = () => {
        if (!src) return;
        const normSize = normalizeSize(size);
        const md = buildImageMarkdown({ src, alt, align, wrap, size: normSize, plain });
        onInsert?.(md);
    };

    if (!open) return null;

    return (
        <div className="imgmodal-backdrop" onClick={onClose}>
            <div className="imgmodal" onClick={(e) => e.stopPropagation()}>
                <h3 className="imgmodal-title">Вставити зображення</h3>

                <label className="imgmodal-label">Посилання (URL)</label>
                <input
                    ref={urlRef}
                    className="imgmodal-input"
                    type="url"
                    placeholder="https://…"
                    value={src}
                    onChange={(e) => setSrc(e.target.value)}
                />

                <label className="imgmodal-label">Підпис (alt)</label>
                <input
                    className="imgmodal-input"
                    type="text"
                    placeholder="Короткий опис картинки"
                    value={alt}
                    onChange={(e) => setAlt(e.target.value)}
                />

                <div className="imgmodal-row">
                    <div className="imgmodal-col">
                        <label className="imgmodal-label">Вирівнювання</label>
                        <div className="imgmodal-seg">
                            {["left", "center", "right"].map((v) => (
                                <button
                                    key={v}
                                    type="button"
                                    className={`imgmodal-segBtn ${align === v ? "is-active" : ""}`}
                                    onClick={() => setAlign(v)}
                                >
                                    {v}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="imgmodal-col">
                        <label className="imgmodal-label">Розмір</label>
                        <input
                            className="imgmodal-input"
                            type="text"
                            placeholder='напр. 30 / 320px / 30%'
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                        />
                        <div className="imgmodal-hint">
                            Число у % або px
                        </div>
                    </div>
                </div>

                <div className="imgmodal-checks">
                    <label>
                        <input type="checkbox" checked={wrap} onChange={(e) => setWrap(e.target.checked)} /> Обтікання
                    </label>
                    <label>
                        <input type="checkbox" checked={plain} onChange={(e) => setPlain(e.target.checked)} /> Без рамки
                    </label>
                </div>

                <div className="imgmodal-actions">
                    <button type="button" className="imgmodal-btn" onClick={onClose}>Скасувати</button>
                    <button
                        type="button"
                        className="imgmodal-btn imgmodal-btn--primary"
                        onClick={submit}
                        disabled={!src}
                    >
                        Вставити
                    </button>
                </div>
            </div>
        </div>
    );
}
