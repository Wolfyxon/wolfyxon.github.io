import * as fs from "fs";
import Markdown from "markdown-to-jsx";
import { ReactNode } from "react";

import "@/app/css/animations.css";
import "./MarkdownPage.css";

export default async function MarkdownPage(data: {children: string | ReactNode | ReactNode[], src?: string}) {

    let content: ReactNode = null;

    if(typeof(data.children) == "string" || data.src) {
        let markdown = "";

        if(data.src) {
            markdown = await fs.readFileSync(data.src).toString();
        } else {
            markdown = data.children as string;
        }
        
        content = <Markdown>{markdown}</Markdown>
    } else {
        content = data.children;
    }

    return (
        <article className="article-page">
            {content}
        </article>
    )
}