"use client";

import { coordToIdx, randi, Rect2 } from "@/util/math";
import { Fragment, useEffect, useState } from "react";

import "./style.css";

export default function BitAreaTestPage() {
    const SIZE = 4;
    const [grid, setGrid] = useState<number[]>([]);
    const [areas, setAreas] = useState<Rect2[]>([]);
    const [renders, setRenders] = useState(0);

    function genGrid() {
        const newGrid = [];

        for(let i = 0; i < SIZE * SIZE; i++) {
            newGrid.push(randi(0, 1));
        }

        setGrid(newGrid);
        calcAreas(newGrid);
        setRenders(renders + 1);
    }

    function calcAreas(grid: number[]) {
        const gridClone = Array.from(grid);
        const newAreas: Rect2[] = [];

        for(let x = 0; x < SIZE; x++) {
            for(let y = 0; y < SIZE; y++) {
                if(!gridClone[coordToIdx(x, y, SIZE)]) {
                    continue;
                }

                const area = calcArea(gridClone, x, y);
                newAreas.push(area);
            }
        }

        setAreas(newAreas);
    }

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
    
    function toggleBit(i: number) {
        grid[i] = (grid[i] + 1) % 2;
        console.log(grid[i]);
        setGrid(grid);
        calcAreas(grid);
        setRenders(renders + 1);
    }

    function clearGrid() {
        const newGrid = [];

        for(let i = 0; i < SIZE * SIZE; i++) {
            newGrid.push(0);
        }

        setGrid(newGrid);
        setAreas([]);
        setRenders(renders + 1);
    }

    useEffect(() => {
        genGrid();
    }, []);

    return (
        <main data-renders={renders}>
            <div id="grid">
                {
                    grid.map((v, i) => <Fragment key={i}>
                        {
                            i % SIZE == 0 && i != 0 && i < (SIZE * SIZE) 
                            ? <br/>
                            : null
                        }
                        <div 
                            className={v == 1 ? "filled" : undefined}
                            onClick={() => toggleBit(i)}
                        />

                    </Fragment>)
                }
                {
                    areas.map((v, i) => 
                        <div
                            key={i} 
                            className="area"
                            style={{
                                "--x": v.x,
                                "--y": v.y,
                                "--w": v.w,
                                "--h": v.h,
                                background: `hsl(${(i + v.x + v.y) * 200}deg 100% 50%)`
                            } as any}
                        />
                    )
                }
            </div>

            <button onClick={genGrid}>Randomize</button>
            <button onClick={clearGrid}>Clear</button>

            <div>Area count: {areas.length}</div>
        </main>
    )
}