"use client"

import { useEffect, useRef } from "react"

export default function ArticleNav() {
    const ref = useRef(null);
    

    useEffect(() => {
        const nav = ref.current! as HTMLElement;
        
        const headings = document.querySelectorAll(".article-page article *:is(h1, h2, h3, h4, h5, h6)");
        
        const rootList = document.createElement("ul");
        
        let current = rootList;
        let currentDepth = 1;

        for(const h of headings) {
            const depth = parseInt(h.tagName.replace("H", ""));

            if(depth != currentDepth) {
                if(depth > currentDepth) {
                    const list = document.createElement("ul");

                    current.appendChild(list);
                    current = list;
                } else {
                    current = current.parentElement! as HTMLUListElement;
                }

                currentDepth = depth;
            }

            current.innerHTML += `<li><a href="#${h.id}">${h.innerHTML}</a></li>`;
        }

        nav.appendChild(rootList);
    });

    return (
        <nav className="article-nav" ref={ref}>
            <h1>On this page</h1>

        </nav>
    )
}