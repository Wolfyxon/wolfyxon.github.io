"use client";

import ImageButton from "@/components/input/ImageButton/ImageButton";
import { useRef, useState } from "react";
import { removeEmpty } from "@/utils";

import "./style.css";

export default function ImpressRemote() {
    const [currentSlideSrc, setCurrentSlideSrc] = useState<string | undefined>(undefined);
    const [slides, setSlides] = useState<string[]>([]);
    const [connected, setConnected] = useState(false);

    const wsRef = useRef<WebSocket>(null);

    const addressRef = useRef<HTMLInputElement>(null);
    
    function onMessage(e: MessageEvent) {
        console.log(e.data);

        const splitData = removeEmpty((e.data as string).split("\n"));
        
        const msg = splitData[0];
        const data1 = splitData[1];
        const data2 = splitData[2];
        
        if(msg == "slide_preview") {
            if(data1 == "0") {
                setSlides([]);
            }
            
            // TODO: Fix slides not adding until you change anything in the code and save lol

            setSlides((prev) => {
                const url = `data:image/png;base64,${data2}`;
                const index = parseInt(data1);

                if(prev.length >= index) {
                    prev[index] = url;
                } else {
                    prev.push(url);
                }

                return prev;
            });
        }
    }

    function connect() {
        const address = addressRef.current!.value;

        console.log("Connecting...");

        try {
            const ws = new WebSocket(address);
            
            ws.onopen = () => {
                console.log("Connected");
                wsRef.current = ws;
                setConnected(true);
            } 

            ws.onmessage = onMessage;
        } catch(e) {
            alert("Unable to connect: " + e);
        }
    }

    function start() {
        console.log("start");
        wsRef.current!.send("presentation_start\n\n");
    }

    function goPrev() {
        wsRef.current!.send("transition_previous\n\n");
    }

    function goNext() {
        wsRef.current!.send("transition_next\n\n");
    }

    const panel = (
        <div className="impress-remote-panel">
                    <div className="impress-remote-slides">
                        {slides.map((src, i) => <img src={src} height={100} key={`slide-${i}`} alt={`Slide ${i}`} />)}
                    </div>

                    <div className="impress-remote-slide-label">Current slide: 0/1</div>

                    <div className="impress-remote-controls">
                        <ImageButton label="Previous" img="/assets/media/img/icons/google/prev.svg" onClick={goPrev} />
                        <ImageButton label="Next" img="/assets/media/img/icons/google/next.svg" onClick={goNext} reverse />
                    </div>

                    <ImageButton label="Start presentation" img="/assets/media/img/icons/google/playCircle.svg" onClick={start} />
        </div>
    );

    const connectPanel = (
        <div className="impress-remote-connect">
            <h1>Impress Remote</h1>

            <label>
                WebSocket address: <br/>
                <input type="text" placeholder="ws://" defaultValue="ws://localhost:1600" ref={addressRef} />
            </label>
            
            <button onClick={connect}>Connect</button>

            <p>
            <a href="https://github.com/Wolfyxon/ImpressProxy/releases/latest">Download</a> <a href="https://github.com/Wolfyxon/ImpressProxy">ImpressProxy</a> to
            allow controlling LibreOffice Impress presentations with your browser.
            </p>
        </div>
    );

    return (
        <div className="impress-remote">
            <div className="impress-remote-lr">
                <img height={250} className="impress-remote-preview" alt="Slide preview" src={currentSlideSrc}  />

                {connected ? panel : connectPanel}
            </div>
        </div>
    )
}