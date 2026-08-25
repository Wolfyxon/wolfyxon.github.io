"use client";

import { useEffect, useRef } from "react";
import "./style.css";
import { coordToIdx, Rect2 } from "@/util/math";
import { shuffleArray } from "@/util/arrays";

export default function ElementBadApple() {
    const videoRef = useRef<HTMLVideoElement>(null);
    
    const SIZE = 225;

    function calcArea(grid: number[], x: number, y: number): Rect2 {
        const rect = {
            x: x,
            y: y,
            w: 1,
            h: 1
        };

        grid[coordToIdx(x, y, SIZE)] = 0;

        while(rect.y + rect.h < SIZE) {
            const toClear = [];
            let canExpandHeight = true;
            
            for(let x = rect.x; x < rect.x + rect.w; x++) {
                const idx = coordToIdx(x, rect.y + rect.h, SIZE);
                const down = grid[idx];

                if(!down) {
                    canExpandHeight = false;
                    break;
                }

                toClear.push(idx);
            }

            if(!canExpandHeight) {
                break
            }

            for(const idx of toClear) {
                grid[idx] = 0;
            }

            rect.h++;
        }

        while(rect.x + rect.w < SIZE) {
            const toClear = [];
            let canExpandWidth = true;
            
            for(let y = rect.y; y < rect.y + rect.h; y++) {
                const idx = coordToIdx(rect.x + rect.w, y, SIZE);
                const right = grid[idx];

                if(!right) {
                    canExpandWidth = false;
                    break;
                }

                toClear.push(idx);
            }

            if(!canExpandWidth) {
                break
            }

            for(const idx of toClear) {
                grid[idx] = 0;
            }

            rect.w++;
        }

        return rect;
    }

    function getAreas(grid: number[]) {
        const areas: Rect2[] = [];

        for(let x = 0; x < SIZE; x++) {
            for(let y = 0; y < SIZE; y++) {
                if(!grid[coordToIdx(x, y, SIZE)]) {
                    continue;
                }

                const area = calcArea(grid, x, y);
                areas.push(area);
            }
        }

        return areas;
    }

    useEffect(() => {
        const elms = Array.from(document.querySelectorAll("body *"));
        shuffleArray(elms);

        for(const elm of elms) {
            (elm as HTMLElement).style.visibility = "none";
            document.body.appendChild(elm);
        }

        const canvas = document.createElement("canvas");
        canvas.width = SIZE;
        canvas.height = SIZE;
        
        const ctx = canvas.getContext("2d")!;

        setInterval(() => {
            const grid = Array(canvas.width * canvas.height);
            ctx.drawImage(videoRef.current!, 0, 0, canvas.width, canvas.height);

            const pixels = ctx!.getImageData(0, 0, canvas.width, canvas.height).data;

            for(let i = 0; i < pixels.length; i += 4) {
                const r = pixels[i];
                const g = pixels[i + 1];
                const b = pixels[i + 2];
                const brightness = ( 3 * r + 4 * g + b) >>> 3;

                if(brightness < 60) {
                    grid[i / 4] = 0;
                } else {
                    grid[i / 4] = 1;
                }
            }

            const areas = getAreas(grid);
            
            for(let i = 0; i < elms.length; i++) {                
                const elm = elms[i] as HTMLElement;
                
                if(!elm) {
                    continue;
                }

                if(elm == videoRef.current) {
                    continue;
                }

                const area = areas[i];
            
                if(!area) {
                    elm.style.visibility = "hidden";
                    continue;
                }

                elm.style.removeProperty("visibility");
                
                const SCALE = 2.5;
                
                elm.style.width = (area.w * SCALE).toString() + "px";
                elm.style.height = (area.h * SCALE).toString() + "px";

                elm.style.left = (area.x * SCALE).toString() + "px";
                elm.style.top = (area.y * SCALE).toString() + "px";
            }

            document.addEventListener("mousedown", () => {
                videoRef.current!.play();
            });

            videoRef.current!.play();
        }, 10);
    });

    return (<>
        <video autoPlay ref={videoRef} id="badapple-video">
            <source src="/assets/video/bad_apple.mp4" type="video/mp4"/>
        </video>
    </>);
}
