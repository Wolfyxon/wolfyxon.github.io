"use client";

import Timer from "@/components/Timer";
import "./style.css";
import { useEffect, useRef, useState } from "react";
import { lerp, randi } from "@/util/math";

const HL = 24110 * (60 * 60) * 24 * 365;
const MASS = 6.2 * 1000; 
const TIME = HL * MASS * 2;

export default function PlutoniumPage() {
    const [slipped, setSlipped] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    function slip() {
        if(slipped) {
            return;
        }

        const hit = new Audio("/assets/audio/pipe.ogg");
        hit.play();

        const buzz = new Audio("/assets/audio/microwave-loud.ogg");
        buzz.play();

        setSlipped(true);

        setTimeout(() => {
            window.location.href = "/assets/img/maxwell.jpg";
        }, 2500);
    }

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        let chance = 20000;

        ctx.fillStyle = "white";

        setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            if(document.querySelector(".slip")) {
                chance = lerp(chance, 0, 0.25);
            }

            for(let i = 0; i < 10000; i++) {
                if(randi(0, chance) != 0) {
                    continue;
                }

                const x = randi(0, canvas.width);
                const y = randi(0, canvas.height);
                
                ctx.fillRect(x, y, 1, 1);
            }
        }, 10);
    }, []);

    return (<>
        <canvas id="canvas" ref={canvasRef}/>

        <div id="core" className={slipped ? "slip" : undefined}>
            <img id="top" src="/assets/img/plutonium/top.webp"/>
            <img id="screwdriver" src="/assets/img/plutonium/screwdriver.webp" onClick={slip} title="Don't you dare"/>
            <img id="bottom" src="/assets/img/plutonium/bottom.webp"/>
        </div>

        <h1>
            {
                slipped 
                ? "WHAT HAVE YOU DONE"
                : "This ball of plutonium-239 will fully decay into uranium-235 in"
            }
        </h1>
        <h2>
            {
                slipped
                ? "FUUUUUUUUUUUUCK"
                : <Timer seconds={TIME}>%y years %d days %h hours %m minutes</Timer>
            }
        </h2>
        <h3>
            {
                slipped
                ? "YOU WERE SUPPOSED TO LEAVE IT ALONE"
                : "Leave it alone"
            }
        </h3>
    </>)    
}