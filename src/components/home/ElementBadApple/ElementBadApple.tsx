"use client";

import { useEffect, useRef } from "react";
import { coordToIdx, Rect2 } from "@/util/math";
import { shuffleArray } from "@/util/arrays";

import "./style.css";

export default function ElementBadApple() {
    const videoRef = useRef<HTMLVideoElement>(null);
    
    const WIDTH = 300;
    const HEIGHT = 225;

    function calcArea(grid: number[], x: number, y: number): Rect2 {
        const rect = {
            x: x,
            y: y,
            w: 1,
            h: 1
        };

        grid[coordToIdx(x, y, WIDTH)] = 0;

        while(rect.y + rect.h < HEIGHT) {
            const toClear = [];
            let canExpandHeight = true;
            
            for(let x = rect.x; x < rect.x + rect.w; x++) {
                const idx = coordToIdx(x, rect.y + rect.h, WIDTH);
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

        while(rect.x + rect.w < WIDTH) {
            const toClear = [];
            let canExpandWidth = true;
            
            for(let y = rect.y; y < rect.y + rect.h; y++) {
                const idx = coordToIdx(rect.x + rect.w, y, WIDTH);
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

        for(let x = 0; x < WIDTH; x++) {
            for(let y = 0; y < HEIGHT; y++) {
                if(!grid[coordToIdx(x, y, WIDTH)]) {
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
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        
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
                
                elm.style.width = ((area.w / WIDTH) * 100).toString() + "vw";
                elm.style.height = ((area.h / HEIGHT) * 100).toString() + "vh";

                elm.style.left = ((area.x / WIDTH) * 100).toString() + "vw";
                elm.style.top = ((area.y / HEIGHT) * 100).toString() + "vh";
            }

            document.addEventListener("mousedown", () => {
                videoRef.current!.play();
            });
        }, 10);

        setTimeout(() => {
            console.log("attempt load")
            videoRef.current!.load();
        }, 100);

        videoRef.current!.onload = () => {
            console.log("AAAAAAA")
        };
    }, []);

    return (<>
        <video autoPlay ref={videoRef} id="badapple-video" src="/assets/video/bad_apple.mp4"/>
    </>);
}
