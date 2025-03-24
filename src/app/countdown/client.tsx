"use client"

import { useEffect } from "react";

import "./countdown.css";

export default function MinecraftMovieCountdownClient() {
    const release = new Date("2025-04-03");

    useEffect(() => {
        const timer = document.getElementById("timer")!;
        const video = document.getElementById("video")! as HTMLVideoElement;

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

            if(offset <= 0) {
                video.style.opacity = "1";
                video.play();
            }
        }

        itv = setInterval(update, 1000);
        update();
    }, []);

    return (
        <>
            <video id="video" loop>
                <source src="/assets/media/video/I_am_Steve.mp4" type="video/mp4" />
                Video not supported :c
            </video>

            <div id="container">
                <p id="label">Minecraft Movie is out in...</p>
                <div id="timer"></div>
            </div>
        </>
    );
}