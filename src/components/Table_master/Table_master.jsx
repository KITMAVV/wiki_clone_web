import React from "react";
import PropTypes from "prop-types";

/**
 * Приклад як використати:
 *
 * const columns = [
 *   { key: "id",    title: "ID",    style: { width: 90, textAlign: "right" } },
 *   { key: "name",  title: "Імя" },
 * ];
 * const rows = [
 *   { id: 1, name: "крутій228", email: "longemail@example.com" },
 * ];
 *
 *
 * <div><DataTable columns={columns} rows={rows}/></div>
 *
 */

export default function DataTable({ columns, rows }) {
    const tableStyle = {
        width: 970,
        tableLayout: "fixed",
        borderCollapse: "collapse",
        borderSpacing: 0,
    };

    const headerCellBase = {
        padding: "10px 12px",
        background: "#B5C1C6",
        border: "1px solid #4A4A4A",
        borderBottom: "none",
        fontFamily: "Montserrat",
        fontSize: 14,
        fontWeight: 800,
        textAlign: "center",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    };

    const cellBase = {
        padding: "10px 12px",
        background: "#E4E5E4",
        textAlign: "center",
        fontSize: 16,
        border: "1px solid #B5C1C6",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        verticalAlign: "top",
    };

    const colWidth = (style) => {
        if (!style || style.width == null) return undefined;
        return typeof style.width === "number" ? `${style.width}px` : style.width;
    };

    return (
        <div style={{ width: 1100, overflow: "hidden" }}>
            <table style={tableStyle}>
                <colgroup>
                    {columns.map((col) => (
                        <col key={col.key} style={{width: colWidth(col.style)}}/>
                    ))}
                </colgroup>

                <thead>
                <tr>
                    {columns.map((col) => (
                        <th
                            key={col.key}
                            scope="col"
                            style={{...headerCellBase, ...(col.style || {})}}
                            title={String(col.title ?? "")}
                        >
                            {col.title}
                        </th>
                    ))}
                </tr>
                </thead>

                <tbody>
                {rows.map((row, rIdx) => (
                    <tr key={rIdx}>
                        {columns.map((col) => {
                            const raw = row?.[col.key];
                            const content =
                                raw == null
                                    ? ""
                                    : (typeof raw === "string" || typeof raw === "number"
                                        ? String(raw)
                                        : raw);

                            return (
                                <td
                                    key={col.key}
                                    style={{...cellBase, ...(col.style || {})}}
                                    title={typeof content === "string" ? content : ""}
                                >
                                    {content}
                                </td>
                            );
                        })}
                    </tr>
                ))}
                {rows.length === 0 && (
                    <tr>
                        <td
                            colSpan={columns.length}
                            style={{...cellBase, color: "#64748b", textAlign: "center"}}
                        >
                            No data
                        </td>
                    </tr>
                )}
                </tbody>

            </table>
        </div>
    );
}

DataTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,     // ключ для данних строки
            title: PropTypes.node.isRequired,     // заголовок стовпця
            style: PropTypes.object,              // inline-стилі (width, textAlign и т.п.) *це чисто dev фіча, смертним юзерам воно не треба
        })
    ).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
};
