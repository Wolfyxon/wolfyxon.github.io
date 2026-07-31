"use client";

import { useEffect, useRef, useState } from "react";
import { angleTo, deg2rad, getDistance, isColliding, randf, Vector2 } from "@/util/math";

import "./style.css";

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
    const mousePosRef = useRef<Vector2>({x: 0, y: 0});

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
    }

    function spawnRocketRandom() {
        const rect = mapRef.current?.getBoundingClientRect();

        if(!rect) {
            return;
        }

        spawnRocket(randf(rect.width * 0.1, rect.width - (rect.width * 0.1)), -5, deg2rad(90 + randf(-20, 20)));
    }

    function moveRocket(r: HTMLDivElement, step: number) {
        let x = parseFloat(r.style.getPropertyValue("--x"));
        let y = parseFloat(r.style.getPropertyValue("--y"));
        let rot = parseFloat(r.style.getPropertyValue("--rot"));

        x += Math.cos(rot) * step;
        y += Math.sin(rot) * step;

        r.style.setProperty("--x", x.toString());
        r.style.setProperty("--y", y.toString());
    }

    function fire() {
        const rect = mapRef.current?.getBoundingClientRect();

        if(!rect) {
            return;
        }

        const x = rect.width / 2;
        const y = rect.height - 10;

        spawnRocket(x, y, angleTo(x, y, mousePosRef.current.x, mousePosRef.current.y));
    }

    useEffect(() => {
        spawnRocketRandom();
        setInterval(spawnRocketRandom, 2000);

        let lastFrame = Date.now();
        
        setInterval(() => {
            const now = Date.now();
            const delta = now - lastFrame;
            lastFrame = now;

            const rockets = mapRef.current!.querySelectorAll(".rocket") as NodeListOf<HTMLDivElement>;
            const rect = mapRef.current!.getBoundingClientRect();

            if(!rect) {
                return;
            }

            let collidedRocketIdx = -1;

            for(const r of rockets) {
                moveRocket(r, 0.1 * delta);

                const x = parseFloat(r.style.getPropertyValue("--x"));
                const y = parseFloat(r.style.getPropertyValue("--y"));

                for(const r2 of rockets) {
                    if(r == r2) {
                        continue;
                    }

                    const x2 = parseFloat(r2.style.getPropertyValue("--x"));
                    const y2 = parseFloat(r2.style.getPropertyValue("--y"));

                    if(getDistance(x, y, x2, y2) < 5) {
                        r2.remove();
                    }
                }

                if(y > rect.height || x < 0 || x > rect.width) {
                    r.remove();

                    if(y > rect.height) {
                        // boom
                    }

                    continue;
                }
            }
        });

        document.addEventListener("mousemove", (e) => {
            mousePosRef.current.x = e.pageX;
            mousePosRef.current.y = e.pageY;
        });

        document.addEventListener("mousedown", fire);
    }, []);

    return (
        <div className="rocket-game">
            <div className="rockets" ref={mapRef}></div>
            <div className="init-text">I see you're bored</div>
        </div>
    )
}