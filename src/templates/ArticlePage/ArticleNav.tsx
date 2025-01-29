"use client"

import { useEffect, useRef } from "react"

export default function ArticleNav() {
    const ref = useRef(null);
    

    useEffect(() => { // TODO: Nesting
        const nav = ref.current! as HTMLElement;
        
        const headings = document.querySelectorAll(".article-page *:is(h1, h2, h3, h4, h5, h6)");
        
        let rootList = document.createElement("ul");

        for(const h of headings) {
            rootList.innerHTML += `<li><a href="#${h.id}">${h.innerHTML}</a></li>`;
        }

        nav.appendChild(rootList);
    });

    return (
        <nav className="article-nav" ref={ref}>
            <h1>On this page</h1>

        </nav>
    )
}