"use client";

import { useEffect, useRef, useState } from "react";
import "./style.css";

const MAP_WIDTH = 3;
const MAP_SIZE = MAP_WIDTH * MAP_WIDTH;

// TODO: Make an algorithm for this abomination
const WIN_COMBINATIONS = [
    [
        1, 1, 1,
        0, 0, 0,
        0, 0, 0
    ],
    [
        0, 0, 0,
        1, 1, 1,
        0, 0, 0
    ],
    [
        0, 0, 0,
        0, 0, 0,
        1, 1, 1
    ],
    [
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
    ],
    [
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
    ],
    [
        0, 0, 1,
        0, 0, 1,
        0, 0, 1
    ],
    [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1,
    ],
    [
        0, 0, 1,
        0, 1, 0,
        1, 0, 0
    ]
];

export default function TicTacToe() {
    const mapRef = useRef(null);
    const [cells, setCells] = useState(emptyCells());
    const [currentPlr, setCurrentPlr] = useState("x");

    function emptyCells() {
        return new Array(MAP_SIZE).fill("");
    }

    function testCombo(combo: number[]): boolean {
        console.log(cells)
        for(let i = 0; i < cells.length; i++) {
            if(combo[i] == 1 && cells[i] != currentPlr) {
                return false;
            }
        }

        return true;
    }

    function isWinner(): boolean {
        for(const combo of WIN_COMBINATIONS) {
            if(testCombo(combo)) {
                return true;
            }
        }

        return false;
    }

    function cellClick(cellIdx: number) {
        if(cells[cellIdx] != "") return;

        setCells(cells.map((v, i) => {
            if(i == cellIdx) {
                return currentPlr;
            } else {
                return v;
            }
        }));
    }

    useEffect(() => {
        if(isWinner()) {
            alert(`${currentPlr} wins`);
            setCells(emptyCells());
            return;
        }

        if(currentPlr == "x") {
            setCurrentPlr("o");
        } else {
            setCurrentPlr("x");
        }
    }, [cells]);

    return (
        <>
        
        <div id="main">
            <div id="map" ref={mapRef}>
                {
                    cells.map((v, i) => 
                        <Cell value={v} handler={() => cellClick(i)}  key={i} />
                    )
                }
            </div>
        </div>

        </>
    )
}

function Cell(props: {value: string, handler: () => any}) {
    return (
        <button className="cell" onClick={() => props.handler()}>{props.value}</button>
    )
}