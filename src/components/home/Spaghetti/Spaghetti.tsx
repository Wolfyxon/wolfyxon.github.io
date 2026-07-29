"use client"

import { useEffect, useState } from "react";
import "./style.css";
import { EventListener } from "@/util/dom";

export default function Spaghetti() {
    const [triggered, setTriggered] = useState(false);

    function trigger() {
        setTriggered(false); 
        const audio = new Audio("/assets/audio/vine-boom-bass-boosted.mp3");
        
        audio.play();
        setTriggered(true);

        setTimeout(() => {
            setTriggered(false);   
        }, 2000);
    }

    useEffect(() => {
        let buf = "";

        const ev =new EventListener(document, "keydown", (e) => {
            if(buf.length > 64) {
                buf = "";
            }

            buf += (e as any).key;

            if(buf.includes("papyrus") && !triggered) {
                trigger();
            }
        });

        return () => {
            ev.disconnect();
        }

    }, [triggered]);

    return (<>
        {
            triggered ? <img src="/assets/img/spaghetti.webp" className="spaghetti"/> : null
        }
    </>)
}