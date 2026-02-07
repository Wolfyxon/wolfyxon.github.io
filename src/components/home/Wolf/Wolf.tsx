"use client";

import { useRef } from "react";
import "./style.css";

export default function Wolf() {
    const ref = useRef<HTMLImageElement>(null);

    let patResetTimeout: NodeJS.Timeout | null;

    function onClick() {
        stopReset();

        const wolf = ref.current;
        wolf!.classList.remove("pat");

        patResetTimeout = setTimeout(() => {
            wolf!.classList.add("pat");
        }, 12);
    }

    function stopReset() {
        if(patResetTimeout) {
            clearInterval(patResetTimeout);
            patResetTimeout = null
        }
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