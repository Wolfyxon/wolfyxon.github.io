"use client"

import { useEffect } from "react";

export default function ClientWorker() {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            for(const entry of entries) {
                entry.target.classList.toggle("visible", entry.isIntersecting);
                entry.target.classList.toggle("invisible", !entry.isIntersecting);
            }
        })
    
        for(const elm of document.getElementsByClassName("observing")) {
            observer.observe(elm);
        }
    }, []);

    return null;
}