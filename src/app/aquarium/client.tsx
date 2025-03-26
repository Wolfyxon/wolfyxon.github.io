"use client"

import { useEffect } from "react";

import "./aquarium.css";
import { clamp } from "@/utils";

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

    update(delta: number) {
        this.moveRotated(this.angle, this.speed * delta)
    }
}

export default function AquariumClient() {
    useEffect(() => {
        const aquarium = document.getElementById("aquarium")!;
        const objects: Object[] = [];

        const fish = new Object("🐟");
        
        function addObject(obj: Object) {
            objects.push(obj);
            aquarium.append(obj.element);
        }

        addObject(fish);

        let last = Date.now();

        setInterval(() => {
            const now = Date.now();
            const delta = now - last;
            last = now;

            objects.forEach((o) => {
                o.update(delta);
            });
        }, 0);
    }, []);

    return (
        <>
            <div id="aquarium"></div>
        </>
    );
}