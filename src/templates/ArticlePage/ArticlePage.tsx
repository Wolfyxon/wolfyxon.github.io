import * as fs from "fs";
import Markdown from "markdown-to-jsx";
import { ReactNode } from "react";

import "@/app/css/animations.css";
import "./ArticlePage.css";
import ArticleNav from "./ArticleNav";

export default async function ArticlePage(data: {children: string | ReactNode | ReactNode[], src?: string, title?: string}) {

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
        <div className="article-page">
            <article>{content}</article>

            <ArticleNav title={data.title} />
        </div>
    )
}