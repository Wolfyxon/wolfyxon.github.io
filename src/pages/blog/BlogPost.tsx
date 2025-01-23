import { useEffect, useState } from "react";
import Markdown from "react-markdown";

export default function BlogPost() {
    const [post, loadPost] = useState("");

    const urlParts = window.location.href.split("/");
    const name = urlParts[urlParts.length - 1];

    useEffect(() => {
        fetch(`/posts/${name}.md`)
            .then((res) => { return res.text()})
            .then((text) => loadPost(text));
    });

    return (
        <>
            <Markdown>
                {post}
            </Markdown>
        </>
    );
}