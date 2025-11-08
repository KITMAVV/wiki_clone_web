export const getLineBounds = (text, index) => {
    let start = index;
    let end = index;
    while (start > 0 && text[start - 1] !== "\n") start--;
    while (end < text.length && text[end] !== "\n") end++;
    return { start, end };
};

const splitOuterSpaces = (s) => {
    const m = s.match(/^(\s*)([\s\S]*?)(\s*)$/);
    return { lead: m ? m[1] : "", core: m ? m[2] : s, trail: m ? m[3] : "" };
};

const wrapChunkToggle = (chunk, startMarker, endMarker = startMarker) => {
    const hasWrap = chunk.startsWith(startMarker) && chunk.endsWith(endMarker);
    if (hasWrap) {
        return {
            next: chunk.slice(startMarker.length, chunk.length - endMarker.length),
            toggledOff: true,
        };
    }
    return { next: startMarker + chunk + endMarker, toggledOff: false };
};

export const applyInlineWrapPure = (text, a, b, startMarker, endMarker = startMarker) => {
    if (a !== b) {
        const before = text.slice(0, a);
        const sel = text.slice(a, b);
        const after = text.slice(b);

        const { lead, core, trail } = splitOuterSpaces(sel);

        const hasWrap = core.startsWith(startMarker) && core.endsWith(endMarker);
        let nextCore;
        if (hasWrap) {
            nextCore = core.slice(startMarker.length, core.length - endMarker.length);
        } else {
            nextCore = startMarker + core + endMarker;
        }

        const next = before + lead + nextCore + trail + after;

        const newA = a;
        const newB = a + (lead + nextCore + trail).length;
        return { text: next, a: newA, b: newB };

    } else {
        const { start, end } = getLineBounds(text, a);
        const line = text.slice(start, end);
        const { next, toggledOff } = wrapChunkToggle(line, startMarker, endMarker);
        const newText = text.slice(0, start) + next + text.slice(end);
        const caretOffsetInLine = a - start;
        const deltaStart = toggledOff ? -startMarker.length : startMarker.length;
        const newCaret = start + Math.min(next.length, caretOffsetInLine + deltaStart);
        return { text: newText, a: newCaret, b: newCaret };
    }
};

const detectSurroundingWrap = (text, a, b) => {
    const candidates = [
        { open: "**", close: "**" },
        { open: "*",  close: "*"  },
        { open: "<u>", close: "</u>" },
    ];

    for (const { open, close } of candidates) {
        const leftStart  = a - open.length;
        const rightEnd   = b + close.length;
        if (leftStart >= 0 && rightEnd <= text.length) {
            if (text.slice(leftStart, a) === open && text.slice(b, rightEnd) === close) {
                return { open, close, leftStart, rightEnd };
            }
        }
    }
    return null;
};

const unwrapCoreOnce = (core) =>
    core.startsWith("**") && core.endsWith("**") ? core.slice(2, -2) :
        core.startsWith("*")  && core.endsWith("*")  ? core.slice(1, -1)  :
            core.startsWith("<u>")&& core.endsWith("</u>") ? core.slice(3, -4) :
                null;

export const clearSimpleMarksPure = (text, a, b) => {
    const processChunk = (chunk) => {
        const { lead, core, trail } = splitOuterSpaces(chunk);
        const un = unwrapCoreOnce(core);
        const nextCore = un ?? core;
        return { next: lead + nextCore + trail, didUnwrap: !!un };
    };

    if (a !== b) {
        const before = text.slice(0, a);
        const sel    = text.slice(a, b);
        const after  = text.slice(b);

        const { next, didUnwrap } = processChunk(sel);
        if (didUnwrap) {
            return { text: before + next + after, a, b: a + next.length };
        }

        const around = detectSurroundingWrap(text, a, b);
        if (around) {
            const { open, close, leftStart, rightEnd } = around;
            const inner = text.slice(a, b); // само слово/фрагмент
            const newText = text.slice(0, leftStart) + inner + text.slice(rightEnd);
            const newA = a - open.length;
            const newB = b - open.length;
            return { text: newText, a: newA, b: newB };
        }

        return { text, a, b };
    } else {
        const { start, end } = getLineBounds(text, a);
        const line = text.slice(start, end);
        const { next, didUnwrap } = processChunk(line);
        if (didUnwrap) {
            const nextText = text.slice(0, start) + next + text.slice(end);
            const caret = start + Math.min(a - start, next.length);
            return { text: nextText, a: caret, b: caret };
        }

        const around = detectSurroundingWrap(text, a, a);
        if (around) {
            const { open, close, leftStart, rightEnd } = around;
            const coreStart = leftStart + open.length;
            const coreEnd   = rightEnd - close.length;
            const coreText  = text.slice(coreStart, coreEnd);

            const newText = text.slice(0, leftStart) + coreText + text.slice(rightEnd);
            const newCaret = a - open.length;
            return { text: newText, a: newCaret, b: newCaret };
        }

        return { text, a, b: a };
    }
};

export const setLinePrefixPure = (text, a, makePrefix) => {
    const { start, end } = getLineBounds(text, a);
    const line = text.slice(start, end);
    const stripped = line.replace(/^\s*(#{1,6}\s+|>\s+)?/, "");
    const prefix = makePrefix(stripped);
    const newLine = prefix + stripped;
    const newText = text.slice(0, start) + newLine + text.slice(end);
    const caret = start + Math.min(prefix.length, newLine.length);
    return { text: newText, a: caret, b: caret };
};

export const createTextFormatter = ({ getValue, setValue, getSelection, setSelection }) => {
    const applyResult = ({ text, a, b }) => {
        setValue(text);
        setSelection(a, b);
    };

    return {
        bold() {
            const { a, b } = getSelection();
            applyResult(applyInlineWrapPure(getValue(), a, b, "**"));
        },
        italic() {
            const { a, b } = getSelection();
            applyResult(applyInlineWrapPure(getValue(), a, b, "*"));
        },
        underline() {
            const { a, b } = getSelection();
            applyResult(applyInlineWrapPure(getValue(), a, b, "<u>", "</u>"));
        },
        clearMarks() {
            const { a, b } = getSelection();
            applyResult(clearSimpleMarksPure(getValue(), a, b));
        },
        paragraph(label) {
            const { a } = getSelection();
            const makePrefix =
                label === "Абзац" ? () => "" :
                    label === "Заголовок 1" ? () => "## " :
                        label === "Підзаголовок 2" ? () => "### " :
                            label === "Цитата" ? () => "> " : () => "";
            applyResult(setLinePrefixPure(getValue(), a, makePrefix));
        },
    };
};


// франкенштейн світу кода XD
