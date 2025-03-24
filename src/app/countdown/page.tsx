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
            const offset = new Date(release.getTime() - Date.now());

            timer.innerText = [
                `${offset.getDay()} days`, 
                `${offset.getHours()} hours`, 
                `${offset.getMinutes()} minutes`,
                `${offset.getSeconds()} seconds`
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