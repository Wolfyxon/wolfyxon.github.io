"use client";

import { useEffect, useRef, useState } from "react";

import "./style.css";
import { deg2rad } from "@/util/math";

export default function LinkHoverEasterEgg() {
    const [triggered, setTriggered] = useState(true);

    useEffect(() => {
        const parentElms = document.querySelectorAll(".project-extra");
        const order: HTMLElement[] = [];
        let buf = [];

        for(let i = 0; i < parentElms.length; i++) {
            const parent = parentElms[i];
            const links = parent.querySelectorAll("a");

            if(i % 2 == 0) {
                for(const link of links) {
                    order.push(link);
                }
            } else {
                for(let j = links.length - 1; j >= 0; j--) {
                    order.push(links[j]);
                }
            }
        }

        for(const link of order) {
            link.addEventListener("mouseover", (e) => {
                const link = e.target;
                
                buf.push(link);

                if(order[buf.length - 1] != link) {
                    buf = [];
                    return;
                }

                if(buf.length == order.length) {
                    buf = [];
                    alert("Sorry bro this easter egg is still under construction");
                }
            });
        }

    }, []);
    
    return (<>
        {
            triggered ? <RocketCommand/> : null
        }
    </>);
}

function RocketCommand() {
    const mapRef = useRef<HTMLDivElement>(null);
    const rocketsRef = useRef<HTMLDivElement[]>([]);

    function spawnRocket(x: number, y: number, rot: number) {
        const r = document.createElement("div");
        r.classList.add("rocket");

        r.style.setProperty("--rot", rot.toString());
        r.style.setProperty("--x", x.toString());
        r.style.setProperty("--y", y.toString());
        
        r.style.transform = `
            translate(
                calc(var(--x) * 1px), 
                calc(var(--y) * 1px)
            )
            rotate(
                calc(var(--rot) * 1rad)
            )
        `;

        mapRef.current!.appendChild(r);
        rocketsRef.current.push(r);
    }

    function spawnRocketRandom() {
        spawnRocket(0, 0, deg2rad(45));
    }

    function moveRocket(r: HTMLDivElement, step: number) {
        let x = parseFloat(r.style.getPropertyValue("--x"));
        let y = parseFloat(r.style.getPropertyValue("--y"));
        let rot = parseFloat(r.style.getPropertyValue("--rot"));

        x += Math.sin(rot) * step;
        y += Math.cos(rot) * step;

        r.style.setProperty("--x", x.toString());
        r.style.setProperty("--y", y.toString());
    }

    useEffect(() => {
        setInterval(spawnRocketRandom, 1000);

        let lastFrame = Date.now();
        
        setInterval(() => {
            const now = Date.now();
            const delta = now - lastFrame;
            lastFrame = now;

            const rockets = rocketsRef.current;
            let end = rockets.length;

            for(let i = 0; i < end; i++) {
                const r = rockets[i];
                moveRocket(r, 0.1 * delta);

                if(parseFloat(r.style.getPropertyValue("--x")) > 500) {
                    rockets.splice(i, 1);
                    r.remove();
                    
                    i--;
                    end--;
                }
            }
        });
    }, []);

    return (
        <div className="rocket-game">
            <div className="rockets" ref={mapRef}></div>
            <div className="init-text">I see you're bored</div>
        </div>
    )
}