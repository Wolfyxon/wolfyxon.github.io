"use client"

import { useEffect, useRef } from "react";

import "./style.css";

export default function ArticleNav(data: {title?: string}) {
    const mainRef = useRef(null);
    const navRef = useRef(null);
    
    useEffect(() => {
        const nav = navRef.current! as HTMLElement;

        const headings = document.querySelectorAll(".article-page article *:is(h1, h2, h3, h4, h5, h6)");
        const links: HTMLAnchorElement[] = [];

        const observer = new IntersectionObserver((entires) => {
            entires.forEach((entry) => {
                entry.target.classList.toggle("visible", entry.isIntersecting);

                for(let i = 0; i < headings.length; i++) {
                    const h = headings[i];

                    if(h.classList.contains("visible")) {
                        
                        links.forEach((link, linkI) => {
                            link.classList.toggle("current", i == linkI);
                        });

                        break;
                    }
                }
            });
        });

        const rootList = document.createElement("ul");
        
        let current = rootList;
        let currentDepth = 1;
        const maxDepth = 1; // Do not remove the nesting logic, I may remove this limit in future

        for(const h of headings) {
            const depth = parseInt(h.tagName.replace("H", ""));
            observer.observe(h);

            if(depth > maxDepth) {
                continue;
            }

            if(depth != currentDepth) {
                if(depth > currentDepth) {
                    const li = document.createElement("li");
                    const list = document.createElement("ul");

                    li.appendChild(list);
                    current.appendChild(li);

                    current = list;
                } else {
                    current = current.parentElement!.parentElement! as HTMLUListElement;
                }

                currentDepth = depth;
            }

            const link = document.createElement("a");
            link.href = "#" + h.id;
            link.innerText = h.textContent ?? h.innerHTML;
            links.push(link);

            const li = document.createElement("li");
            li.appendChild(link);

            current.appendChild(li);
        }

        nav.appendChild(rootList);
    }, []);

    function switchNav() {
        const container = mainRef.current! as HTMLElement;
        
        container.classList.toggle("open");
    }

    return (
        <div className="article-nav-container" ref={mainRef}>
            <button className="article-nav-btn" aria-label="Article navigation" onClick={switchNav}> </button>

            <nav className="article-nav" ref={navRef}>
                <h1>{data.title ?? "On this page"}</h1>
            </nav>
        </div>
    )
}