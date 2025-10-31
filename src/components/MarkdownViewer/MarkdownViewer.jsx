import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeSlug from "rehype-slug";

import './MarkdownViewer.css'

const sanitizeSchema = {
    ...defaultSchema,
    tagNames: ["h2","h3","p","img","table","thead","tbody","tr","th","td"],
    attributes: {

        h2: ["id"], h3: ["id"],
        img: ["src","alt","title","width","height","loading","decoding"],
        table: ["role"],
        th: ["colspan","rowspan","scope"],
        td: ["colspan","rowspan"],
    },
    protocols: { src: ["https","http","data"] },
};

export default function WikiArticle({ markdown, enableTables=true, components={} }) {
    const baseComponents = {
        h2: (props) => <h2 className="md-wiki-h2" {...props} />,
        h3: (props) => <h3 className="md-wiki-h3" {...props} />,
        p:  (props) => <p className="md-wiki-p" {...props} />,
        img:(props) => <img className="md-wiki-img" loading="lazy" decoding="async" {...props} />,
        table:(props)=> <table className="wiki-table" {...props} />,
        thead:(props)=> <thead className="wiki-thead" {...props} />,
        tbody:(props)=> <tbody className="wiki-tbody" {...props} />,
        tr: (props)=> <tr className="wiki-tr" {...props} />,
        th: (props)=> <th className="wiki-th" {...props} />,
        td: (props)=> <td className="wiki-td" {...props} />,
    };

    return (
        <div class="md-wiki-article">
            <ReactMarkdown
                remarkPlugins={enableTables ? [remarkGfm] : []}
                rehypePlugins={[
                    rehypeSlug,
                    [rehypeSanitize, sanitizeSchema]
                ]}
                skipHtml
                allowedElements={enableTables
                    ? ["h2","h3","p","img","table","thead","tbody","tr","th","td"]
                    : ["h2","h3","p","img"]
                }
                unwrapDisallowed
                components={{ ...baseComponents, ...components }}
            >
                {markdown}
            </ReactMarkdown>
        </div>
    );
}
