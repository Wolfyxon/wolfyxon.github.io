"use client";

import { useRef, useState } from "react";
import "./style.css";

export default function Wolf() {
    const ref = useRef<HTMLImageElement>(null);
    const [clicks, setClicks] = useState(0);
    
    let patResetTimeout: NodeJS.Timeout | null;

    function easterEgg() {
        const audio = new Audio("/assets/audio/ode-to-joy.ogg");
        audio.play();

        for(const e of document.querySelectorAll("div, footer, nav, a, p, img, span")) {
            e.classList.add("spin");
        }
    }

    function onClick() {
        if(clicks < 32) {
            const audio = new Audio("/assets/audio/freddy-nose.mp3");
            audio.volume = 0.25;
            audio.play();
        }

        stopReset();

        const wolf = ref.current;
        wolf!.classList.remove("pat");

        setClicks(clicks + 1);

        if(clicks == 32) {
            easterEgg();
        }

        patResetTimeout = setTimeout(() => {
            wolf!.classList.add("pat");
        }, 50);
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