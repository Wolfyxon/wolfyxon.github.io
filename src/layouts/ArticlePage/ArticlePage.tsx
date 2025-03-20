import * as fs from "fs";
import Markdown from "markdown-to-jsx";
import { ReactNode } from "react";

import ArticleNav from "./ArticleNav";
import FancyHeading from "@/components/FancyHeading/FancyHeading";

import "@/app/css/animations.css";
import "./ArticlePage.css";
import { Generic } from "@/utils";

export default async function ArticlePage(data: {children: Generic, src?: string, title?: string}) {

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
            <FancyHeading>{data.title}</FancyHeading>

            <article>{content}</article>

            <ArticleNav title={data.title} />
        </div>
    )
}