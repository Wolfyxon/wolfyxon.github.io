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
    const [win, setWin] = useState<string | null>(null);
    const [xWins, setXWins] = useState(0);
    const [oWins, setOWins] = useState(0);

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

    function getFilledCellCount(): number {
        let res = 0;

        cells.forEach((v) => {
            if(v != "") {
                res += 1;
            }
        })

        return res;
    }

    function cellClick(cellIdx: number) {
        if(win) return;
        if(cells[cellIdx] != "") return;

        setCells(cells.map((v, i) => {
            if(i == cellIdx) {
                return currentPlr;
            } else {
                return v;
            }
        }));
    }

    function reset() {
        setWin(null);
        setCells(emptyCells());
    }

    useEffect(() => {
        if(isWinner()) {
            setWin(currentPlr);

            if(currentPlr == "x") {
                setXWins(xWins + 1);
            } else {
                setOWins(oWins + 1);
            }

            return;
        } else {
            if(getFilledCellCount() == MAP_SIZE) {
                setWin("Nobody");
            }
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
            <div id="side">
                <p>X: {xWins}</p>
                <p>O: {oWins}</p>

                <button onClick={reset}>Reset</button>
            </div>
        </div>

        {
                win ? <h1 id="win-label">{win} won!</h1> : null
        }

        </>
    )
}

function Cell(props: {value: string, handler: () => any}) {
    return (
        <button className="cell" onClick={() => props.handler()}>{props.value}</button>
    )
}