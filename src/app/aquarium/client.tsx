"use client"

import { useEffect } from "react";

import "./aquarium.css";
import { clamp, lerp, randf } from "@/utils";

class Object {
    char: string;
    element: HTMLElement;
    speed: number = 0.01;
    angle: number = 1;
    x: number = 0;
    y: number = 0;

    constructor(char: string, x?: number, y?: number) {
        this.char = char;

        this.element = document.createElement("div");
        this.element.classList.add("object");
        this.element.innerText = char;

        this.setPos(1, 0);
    }
    
    setPos(x: number, y: number) {
        x = clamp(x, 0, 100);
        y = clamp(y, 0, 100);
        
        this.x = x;
        this.y = y;

        this.element.style.left = `${x}%`;
        this.element.style.top = `${y}%`;
    }

    move(x: number, y: number) {
        this.setPos(this.x + x, this.y + y);
    }
    
    moveRotated(angle: number, speed: number) {
        this.move(
            Math.sin(angle) * speed,
            Math.cos(angle) * speed
        );
    }

    lerpPos(x: number, y: number, speed: number) {
        this.setPos(
            lerp(this.x, x, speed),
            lerp(this.y, y, speed)
        );
    }

    update(delta: number) {
        //this.moveRotated(this.angle, this.speed * delta)
    }
}

class Fish extends Object {
    targetX: number = 0;
    targetY: number = 0;

    constructor() {
        super("🐟");
    }

    update(delta: number) {
        this.lerpPos(this.targetX, this.targetY, 0.005 * delta);
    }
}

export default function AquariumClient() {
    useEffect(() => {
        const aquarium = document.getElementById("aquarium")!;
        const objects: Object[] = [];

        function addObject(obj: Object) {
            objects.push(obj);
            aquarium.append(obj.element);
        }

        addObject(new Fish());

        let last = Date.now();
        let frames = 0;
        const fishRange = 3;

        setInterval(() => {
            const now = Date.now();
            const delta = now - last;
            last = now;
            
            objects.forEach((o) => {
                if(frames % 200 == 0 && o instanceof Fish) {
                    o.targetX = o.x + randf(-fishRange, fishRange);
                    o.targetY = o.y + randf(-fishRange, fishRange);
                }

                o.update(delta);
            });

            frames++;
        }, 0);
    }, []);

    return (
        <>
            <div id="aquarium"></div>
        </>
    );
}