"use client";

import { useEffect, useRef, useState } from "react";
import { angleTo, deg2rad, getDistance, isColliding, randf, Vector2 } from "@/util/math";

import "./style.css";

export default function LinkHoverEasterEgg() {
    const [triggered, setTriggered] = useState(false);

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
                    setTriggered(true);
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
    const MAX_HEALTH = 20;

    const mapRef = useRef<HTMLDivElement>(null);
    const mousePosRef = useRef<Vector2>({x: 0, y: 0});

    const scoreRef = useRef(0);
    const healthRef = useRef(MAX_HEALTH);

    const [forceRenderCount, setForceRenderCount] = useState(0);

    function spawnRocket(x: number, y: number, rot: number, speed?: number) {
        const r = document.createElement("div");
        r.classList.add("rocket");

        r.style.setProperty("--rot", rot.toString());
        r.style.setProperty("--speed", speed ? speed.toString() : "0.1");
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
        if(healthRef.current <= 0) {
            return;
        }

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
        if(healthRef.current <= 0) {
            return;
        }

        const audio = new Audio("/assets/audio/rockets/fire.wav");
        const rect = mapRef.current?.getBoundingClientRect();

        if(!rect) {
            return;
        }

        const x = rect.width / 2;
        const y = rect.height - 10;

        spawnRocket(x, y, angleTo(x, y, mousePosRef.current.x, mousePosRef.current.y), 0.2);
        audio.play();
    }

    function gameOver() {
        const audio = new Audio("/assets/audio/rockets/game-over.wav");
        audio.play();

        mapRef.current!.innerHTML = "";

        setTimeout(() => {
            healthRef.current = MAX_HEALTH;
            scoreRef.current = 0;

            forceRender();
        }, 5000);
    }

    function forceRender() {
        setForceRenderCount((old) => old + 1);
    }

    useEffect(() => {
        spawnRocketRandom();
        setInterval(spawnRocketRandom, 2000);

        let lastFrame = Date.now();

        const rocketHitAudio = new Audio("/assets/audio/rockets/rocket-hit.wav");
        const baseHitAudio = new Audio("/assets/audio/rockets/hit.wav");
        const startAudio = new Audio("/assets/audio/rockets/begin.wav");
        
        setInterval(() => {
            const now = Date.now();
            const delta = now - lastFrame;
            lastFrame = now;

            const rockets = mapRef.current!.querySelectorAll(".rocket") as NodeListOf<HTMLDivElement>;
            const rect = mapRef.current!.getBoundingClientRect();

            if(!rect) {
                return;
            }
            
            for(const r of rockets) {
                const speed = parseFloat(r.style.getPropertyValue("--speed"));
                moveRocket(r, speed * delta);

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
                        rocketHitAudio.play();

                        scoreRef.current += 1;
                        forceRender();
                    }
                }

                if(y > rect.height || x < 0 || x > rect.width) {
                    r.remove();

                    if(y > rect.height) {
                        mapRef.current!.style.animation = "";
                        setTimeout(() => mapRef.current!.style.animation = "base-hit 0.25s");
                        baseHitAudio.play();

                        healthRef.current -= 1;
                        forceRender();

                        if(healthRef.current <= 0) {
                           gameOver();
                        }
                    }

                    continue;
                }
            }
        });

        mapRef.current!.addEventListener("mousemove", (e) => {
            mousePosRef.current.x = e.x;
            mousePosRef.current.y = e.y;
        });

        document.addEventListener("mousedown", fire);
        
        startAudio.play();
    }, []);

    return (
        <div className="rocket-game">
            <div className="stats" data-force-render={forceRenderCount}>
                <div className="stat-health">Health: {healthRef.current}</div>
                <div className="stat-score">Score: {scoreRef.current}</div>
            </div>

            <div className="rockets" ref={mapRef}></div>
            <div className="init-text">I see you're bored</div>
            
            {
                healthRef.current <= 0 ?
                <div className="game-over" data-force-render={forceRenderCount}>GAME OVER</div>
                : null
            }
        </div>
    )
}