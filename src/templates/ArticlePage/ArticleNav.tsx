"use client"

import { useEffect, useRef, useState } from "react";

import "./ArticleNav.css";

export default function ArticleNav(data: {title?: string}) {
    const mainRef = useRef(null);
    const navRef = useRef(null);
    
    useEffect(() => {
        const nav = navRef.current! as HTMLElement;
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