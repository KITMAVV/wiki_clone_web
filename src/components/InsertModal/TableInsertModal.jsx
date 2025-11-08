import { useEffect, useMemo, useRef, useState } from "react";
import "./TableInsertModal.css";

export default function TableInsertModal({
                                             open,
                                             onClose,
                                             onInsert,
                                             initial = {},
                                         }) {
    const [cols, setCols] = useState(initial.cols || 2);
    const [rows, setRows] = useState(initial.rows || 2);
    const [header, setHeader] = useState(
        initial.header && Array.isArray(initial.header)
            ? initial.header
            : Array.from({ length: Math.max(1, initial.cols || 2) }, (_, i) => `Заголовок ${i + 1}`)
    );
    const [data, setData] = useState(
        initial.data && Array.isArray(initial.data)
            ? initial.data
            : Array.from({ length: Math.max(1, initial.rows || 2) }, () =>
                Array.from({ length: Math.max(1, initial.cols || 2) }, () => "")
            )
    );
    const firstInputRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        setCols(initial.cols || 2);
        setRows(initial.rows || 2);
        setHeader(
            initial.header && Array.isArray(initial.header)
                ? initial.header
                : Array.from({ length: Math.max(1, initial.cols || 2) }, (_, i) => `Заголовок ${i + 1}`)
        );
        setData(
            initial.data && Array.isArray(initial.data)
                ? initial.data
                : Array.from({ length: Math.max(1, initial.rows || 2) }, () =>
                    Array.from({ length: Math.max(1, initial.cols || 2) }, () => "")
                )
        );
        setTimeout(() => firstInputRef.current?.focus(), 0);
    }, [open]);

    useEffect(() => {
        setHeader((prev) => Array.from({ length: cols }, (_, i) => prev?.[i] ?? `Заголовок ${i + 1}`));
        setData((prev) =>
            Array.from({ length: rows }, (_, r) =>
                Array.from({ length: cols }, (_, c) => prev?.[r]?.[c] ?? "")
            )
        );
    }, [cols, rows]);

    const markdown = useMemo(() => {
        const esc = (v) => (v ?? "").replace(/\|/g, "\\|");
        const line = (arr) => `| ${arr.map(esc).join(" | ")} |`;
        const headerLine = line(header);
        const sepLine = `| ${Array.from({ length: cols }, () => "---").join(" | ")} |`;
        const bodyLines = data.map((r) => line(r));
        return [headerLine, sepLine, ...bodyLines].join("\n");
    }, [cols, header, data]);

    const changeHeader = (i, value) => {
        setHeader((h) => {
            const next = [...h];
            next[i] = value;
            return next;
        });
    };

    const changeCell = (r, c, value) => {
        setData((d) => {
            const next = d.map((row) => [...row]);
            next[r][c] = value;
            return next;
        });
    };

    const bump = (setter, delta, min, max) => () =>
        setter((v) => Math.min(max, Math.max(min, v + delta)));

    const submit = () => {
        if (!cols || !rows) return;
        onInsert?.(markdown);
    };

    if (!open) return null;

    return (
        <div className="tablemodal-backdrop" onClick={onClose}>
            <div className="tablemodal" onClick={(e) => e.stopPropagation()}>
                <h3 className="tablemodal-title">Вставити таблицю</h3>

                <div className="tablemodal-body">
                    <div className="tablemodal-row">
                        <div className="tablemodal-col">
                            <label className="tablemodal-label">Кількість колонок</label>
                            <div className="tablemodal-inline">
                                <button type="button" className="tablemodal-btn" onClick={bump(setCols, -1, 1, 20)}>−</button>
                                <input
                                    ref={firstInputRef}
                                    className="tablemodal-input"
                                    type="number"
                                    min="1"
                                    max="20"
                                    value={cols}
                                    onChange={(e) => setCols(Math.max(1, Math.min(20, Number(e.target.value) || 1)))}
                                />
                                <button type="button" className="tablemodal-btn" onClick={bump(setCols, +1, 1, 20)}>+</button>
                            </div>
                        </div>

                        <div className="tablemodal-col">
                            <label className="tablemodal-label">Кількість рядків</label>
                            <div className="tablemodal-inline">
                                <button type="button" className="tablemodal-btn" onClick={bump(setRows, -1, 1, 50)}>−</button>
                                <input
                                    className="tablemodal-input"
                                    type="number"
                                    min="1"
                                    max="50"
                                    value={rows}
                                    onChange={(e) => setRows(Math.max(1, Math.min(50, Number(e.target.value) || 1)))}
                                />
                                <button type="button" className="tablemodal-btn" onClick={bump(setRows, +1, 1, 50)}>+</button>
                            </div>
                        </div>
                    </div>

                    <div className="tablemodal-label">Заголовки</div>
                    <table className="tablemodal-table">
                        <thead>
                        <tr>
                            {Array.from({ length: cols }, (_, c) => (
                                <th key={`h-${c}`}>
                                    <input
                                        className="tablemodal-input"
                                        type="text"
                                        value={header[c] || ""}
                                        onChange={(e) => changeHeader(c, e.target.value)}
                                    />
                                </th>
                            ))}
                        </tr>
                        </thead>
                    </table>

                    <div className="tablemodal-label tablemodal-label--spaced">Дані таблиці</div>
                    <div className="tablemodal-tableWrap">
                        <table className="tablemodal-table">
                            <tbody>
                            {Array.from({ length: rows }, (_, r) => (
                                <tr key={`r-${r}`}>
                                    {Array.from({ length: cols }, (_, c) => (
                                        <td key={`c-${r}-${c}`}>
                                            <input
                                                className="tablemodal-input"
                                                type="text"
                                                value={data[r]?.[c] ?? ""}
                                                onChange={(e) => changeCell(r, c, e.target.value)}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="tablemodal-label tablemodal-label--spaced">Попередній перегляд:</div>
                    <textarea
                        className="tablemodal-input tablemodal-preview"
                        readOnly
                        value={markdown}
                    />
                </div>

                <div className="tablemodal-actions">
                    <button type="button" className="tablemodal-btn" onClick={onClose}>Скасувати</button>
                    <button type="button" className="tablemodal-btn tablemodal-btn--primary" onClick={submit}>
                        Вставити
                    </button>
                </div>
            </div>
        </div>
    );
}
