import * as fs from "fs";
import Markdown from "markdown-to-jsx";
import { ReactNode } from "react";

import ArticleNav from "./nav/ArticleNav";
import FancyHeading from "@/components/FancyHeading/FancyHeading";

import "@/app/css/animations.css";
import "./ArticlePage.css";

export default async function ArticlePage(data: {children: ReactNode, headerElement?: ReactNode, footerElement?: ReactNode, src?: string, title?: string}) {

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
            <div className="article-sides">
                <div className="article-container">
                    <FancyHeading centered={true}>{data.title}</FancyHeading>
                    
                    <div className="article-header">
                        {data.headerElement}
                    </div>

                    <article>{content}</article>

                    <div className="article-footer">
                        {data.footerElement}
                    </div>
                </div>

                <ArticleNav title={data.title} />
            </div>
        </div>
    )
}