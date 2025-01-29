"use client"

import { useEffect } from "react"

export default function ArticleNav() {
    useEffect(() => {
        const headings = document.querySelectorAll(".article-page *:is(h1, h2, h3, h4, h5, h6)");

        
    });

    return (
        <nav className="article-nav">
            <h1>On this page</h1>

        </nav>
    )
}