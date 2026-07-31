"use client";

import { ReactNode, useEffect } from "react";

import "./style.css";

export default function UnfitPage() {
    useEffect(() => {
        const audio = new Audio("/assets/audio/c.ogg");

        audio.loop = true;
        audio.volume = 0.25;
        audio.preservesPitch = false;
        audio.playbackRate = 0.15;

        function play() {
            if(!audio.paused) {
                return;
            }

            audio.currentTime = 0.5;
            audio.play();
        }

        document.addEventListener("mousedown", play);
        document.addEventListener("keydown", play);

        play();
    }, []);
    
    function getCircles() {
        const res: ReactNode[] = [];

        for(let dist = 50; dist < 250; dist += 25) {
            for(let rot = 0; rot < 360; rot += 30) {
                res.push(
                    <div className="circle" key={`${rot}-${dist}`} style={{
                        "--rot": rot + dist * 3,
                        "--dist": dist
                    } as any}/>
                )
            }
        }

        return res;
    }

    return (
        <div id="shapes">
            <div className="square"></div>
            {getCircles()}
        </div>
    );
}
