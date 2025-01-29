import * as fs from "fs";
import Markdown from "markdown-to-jsx";
import { ReactNode } from "react";

import "@/app/css/animations.css";
import "./ArticlePage.css";

export default async function ArticlePage(data: {children: string | ReactNode | ReactNode[], src?: string}) {

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

            <nav className="article-nav">
                <h1>On this page</h1>

                <ul>
                    <li><a href="">test</a></li>
                    <li><a href="">test</a></li>
                    <li>
                        <ul>
                            <li><a href="">test</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    )
}