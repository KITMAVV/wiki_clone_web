import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeSlug from "rehype-slug";

import './MarkdownViewer.css'

const sanitizeSchema = {
    ...defaultSchema,
    tagNames: [
        "h2","h3","p","img","table","thead","tbody","tr","th","td",
        "strong","em","u","blockquote","figure","figcaption"
    ],
    attributes: {
        h2: ["id"], h3: ["id"],
        img: ["src","alt","title","width","height","loading","decoding"],
        table: ["role"],
        th: ["colspan","rowspan","scope"],
        td: ["colspan","rowspan"]
    },
    protocols: { src: ["https","http","data"] }
};

function parseImageOpts(title = "") {
    const opts = {
        align: "left",
        wrap: false,
        size: null,
        plain: false
    };
    if (!title) return opts;

    title.split(/[\s;,\|]+/).forEach(tok => {
        const t = tok.trim().toLowerCase();
        if (!t) return;
        if (t === "left" || t === "center" || t === "right") opts.align = t;
        else if (t === "wrap") opts.wrap = true;
        else if (t === "nowrap") opts.wrap = false;
        else if (t === "plain") opts.plain = true;
        else if (t === "frame") opts.plain = false;
        else if (t.startsWith("size=")) opts.size = t.slice(5);
        else if (t.startsWith("w=") || t.startsWith("width=")) {
            const v = t.split("=")[1];
            opts.size = v;
        }
    });

    if (opts.align === "center") opts.wrap = false;
    return opts;
}

export default function WikiArticle({ markdown, enableTables=true, components={} }) {
    const baseComponents = {
        h2: (props) => <h2 className="md-wiki-h2" {...props} />,
        h3: (props) => <h3 className="md-wiki-h3" {...props} />,
        p: ({ node, children, ...rest }) => {
            const hasImg = Array.isArray(node?.children)
                && node.children.some(ch => ch?.tagName === 'img');
            return hasImg
                ? <div className="md-wiki-p" {...rest}>{children}</div>
                : <p className="md-wiki-p" {...rest}>{children}</p>;
        },
        strong: (props) => <strong className="md-wiki-strong" {...props} />,
        em:     (props) => <em className="md-wiki-em" {...props} />,
        u:      (props) => <u className="md-wiki-u" {...props} />,
        blockquote: (props) => <blockquote className="md-wiki-quote" {...props} />,
        img: (props) => {
            const { src, alt, title, width, height } = props;
            const o = parseImageOpts(title);

            const isPercent = (v) => typeof v === "string" && /%$/.test(v);

            const figStyle = {};
            const imgStyle = {};

            if (o.size) {
                if (isPercent(o.size)) {
                    figStyle.maxWidth = o.size;
                    imgStyle.width = "100%";
                    imgStyle.height = "auto";
                } else {
                    imgStyle.maxWidth = o.size;
                    imgStyle.height = "auto";
                }
            }
            if (width)  imgStyle.width = width;
            if (height) imgStyle.height = height;

            const alignCls =
                o.align === "center" ? "md-img-center" :
                    o.align === "right"  ? "md-img-right"  : "md-img-left";

            if (o.plain) {
                if (o.size && isPercent(o.size)) {
                    imgStyle.width = o.size;
                    imgStyle.maxWidth = "100%";
                }
                return (
                    <img
                        className={`md-wiki-img md-img-plain ${alignCls} ${o.wrap ? "md-img-wrap" : ""}`}
                        loading="lazy" decoding="async" src={src} alt={alt || ""} style={imgStyle}
                    />
                );
            }

            return (
                <figure
                    className={`md-wiki-figure ${alignCls} ${o.wrap ? "md-img-wrap" : ""}`}
                    style={figStyle}
                >
                    <img
                        className="md-wiki-img"
                        loading="lazy" decoding="async"
                        src={src} alt={alt || ""} style={imgStyle}
                    />
                    {alt ? <figcaption className="md-wiki-figcaption">{alt}</figcaption> : null}
                </figure>
            );
        },
        table:(props)=> <table className="md-wiki-table" {...props} />,
        thead:(props)=> <thead className="md-wiki-thead" {...props} />,
        tbody:(props)=> <tbody className="md-wiki-tbody" {...props} />,
        tr:   (props)=> <tr className="md-wiki-tr" {...props} />,
        th:   (props)=> <th {...props} />,
        td:   (props)=> <td {...props} />
    };

    return (
        <div className="md-wiki-article">
            <ReactMarkdown
                remarkPlugins={enableTables ? [remarkGfm] : []}
                rehypePlugins={[rehypeRaw, rehypeSlug, [rehypeSanitize, sanitizeSchema]]}
                skipHtml={false}
                allowedElements={
                    enableTables
                        ? ["h2","h3","p","img","table","thead","tbody","tr","th","td","strong","em","u","blockquote","figure","figcaption"]
                        : ["h2","h3","p","img","strong","em","u","blockquote","figure","figcaption"]
                }
                unwrapDisallowed
                components={{ ...baseComponents, ...components }}
            >
                {markdown}
            </ReactMarkdown>
        </div>
    );
}
