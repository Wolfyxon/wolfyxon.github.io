"use client"

import Timer from "@/components/Timer";

import "./countdown.css";
import { useEffect, useState } from "react";

export default function MinecraftMovieCountdownClient() {
    const release = new Date("2025-04-04 14:10:00");
    
    function play() {
        const video = document.getElementById("video")! as HTMLVideoElement;

        video.style.opacity = "1";
        video.play();
    }

    function onEnd() {
        setTimeout(play);
    }

    return (
        <>
            <video id="video" loop>
                <source src="/assets/media/video/I_am_Steve.mp4" type="video/mp4" />
                Video not supported :c
            </video>

            <div id="container">
                <p id="label">Minecraft Movie is out in...</p>
                
                <Timer untilDate={release} onEnd={onEnd} id="timer">
                    %d days %h hours %m minutes %s seconds
                </Timer>
            </div>
        </>
    );
}