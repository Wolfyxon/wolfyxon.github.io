"use client";

import ImageButton from "@/components/input/ImageButton/ImageButton";
import "./ImpressRemote.css";
import { useRef, useState } from "react";

export default function ImpressRemote() {
    const [currentSlideSrc, setCurrentSlideSrc] = useState("https://media.tenor.com/fIaezRSZPSAAAAAe/cat-explosion.png");
    const [slides, setSlides] = useState("https://media.tenor.com/fIaezRSZPSAAAAAe/cat-explosion.png,".repeat(20).split(","));
    const wsRef = useRef<WebSocket>(null);

    const addressRef = useRef<HTMLInputElement>(null);
    
    function connect() {
        const address = addressRef.current!.value;

        console.log("Connecting...");

        try {
            const ws = new WebSocket(address);
            
            ws.onopen = () => {
                console.log("Connected");
                wsRef.current = ws;
            } 
        } catch(e) {
            alert("Unable to connect: " + e);
        }
    }

    function start() {
        console.log("start");
        wsRef.current!.send("presentation_start\n\n");
    }

    const panel = (
        <div className="impress-remote-panel">
                    <div className="impress-remote-slides">
                        {slides.map((src, i) => <img src={src} height={100} key={`slide-${i}`} alt={`Slide ${i}`} />)}
                    </div>

                    <div className="impress-remote-slide-label">Current slide: 0/1</div>

                    <div className="impress-remote-controls">
                        <ImageButton label="Previous" img="/assets/media/img/icons/google/prev.svg" />
                        <ImageButton label="Next" img="/assets/media/img/icons/google/next.svg" reverse />
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

                {/*ws ? panel : connectPanel*/}
                {connectPanel}
                {panel}
            </div>
        </div>
    )
}