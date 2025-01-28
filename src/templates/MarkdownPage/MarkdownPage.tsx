import "@/app/css/animations.css";
import "./MarkdownPage.css";
import Markdown from "markdown-to-jsx";

export default function MarkdownPage(data: {children: string}) {
    return (
        <article className="article-page">
            <Markdown>
                {data.children}
            </Markdown>
        </article>
    )
}