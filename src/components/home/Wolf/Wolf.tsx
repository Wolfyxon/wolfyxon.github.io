"use client";

import { useRef } from "react";
import "./style.css";

export default function Wolf() {
    const ref = useRef<HTMLImageElement>(null);

    function onClick() {
        const wolf = ref.current;

        wolf!.classList.remove("pat");
        setTimeout(() => {
            wolf!.classList.add("pat");
        }, 12)
        
        
    }

    return (
        <img
            src="/assets/img/art/littleWolf.webp" 
            className="wolf"
            alt="Little wolf"
            onClick={onClick}
            ref={ref}
            draggable={false}
        />
    )
}