import * as fs from "fs";
import Markdown from "markdown-to-jsx";

import "@/app/css/animations.css";
import "./MarkdownPage.css";

export default async function MarkdownPage(data: {children: string, src?: string}) {
    let markdown = "";

    if(data.src) {
        markdown = await fs.readFileSync(data.src).toString();
    } else {
        markdown = data.children;
    }
    
    return (
        <article className="article-page">
            <Markdown>
                {markdown}
            </Markdown>
        </article>
    )
}