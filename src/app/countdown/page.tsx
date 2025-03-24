"use client"

import { useEffect, useRef } from "react";

import "./countdown.css";

export default function MinecraftMovieCountdown() {
    const release = new Date("2025-04-03");
    const timerRef = useRef(null);

    useEffect(() => {
        const timer: HTMLElement = timerRef.current!;
        let itv;

        function update() {
            const offset = Math.max(release.getTime() - Date.now(), 0);

            const d = Math.floor(offset / (1000 * 60 * 60 * 24));
            const h = Math.floor((offset % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((offset % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((offset % (1000 * 60)) / 1000);

            timer.innerText = [
                `${d} days`, 
                `${h} hours`, 
                `${m} minutes`,
                `${s} seconds`
            ].join(" ");
        }

        itv = setInterval(update, 1000);
        update();
    }, []);

    return (
        <>
            <div id="container">
                <p id="label">Minecraft Movie is out in...</p>
                <div ref={timerRef} id="timer"></div>
            </div>
        </>
    );
}