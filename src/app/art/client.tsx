"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import Drawing, { DrawingData } from "./Drawing";
import ImageButton from "@/components/input/ImageButton/ImageButton";

const drawings: DrawingData[] = [
    {
        title: "Fight the Void",
        date: "2025-11-25",
        src: "/assets/img/art/Fight_the_Void.webp"
    },
    {
        title: "Passage",
        date: "2025-11-23",
        src: "/assets/img/art/Passage.png"
    },
    {
        title: "Angel of Cyphers",
        date: "2025-11-21",
        src: "/assets/img/art/Angel_of_Cyphers.png"
    },
    {
        title: "Forest Witch",
        date: "2025-07-11",
        src: "/assets/img/art/Forest_Witch.png"
    },
    {
        title: "Arctic Fox",
        date: "2025-04-21",
        src: "/assets/img/art/Arctic_Fox.webp"
    },
    {
        title: "Hungarian Parliament",
        date: "2024-09-24",
        src: "/assets/img/art/Hungarian_Parliament.webp"
    },
    {
        title: "3DS Web Stuff Pigeon sprites",
        date: "2024-03-19",
        src: "/assets/img/art/3DSWebStuff-Pigeon.webp"
    }
];

export default function ArtPageClient() {
    const [lastDrawing, setLastDrawing] = useState<DrawingData | null>(null);
    const [fullscreenOpen, setFullscreenOpen] = useState(false);

    const lastDrawingIdRef = useRef<number>(null);
    const viewRef = useRef<HTMLDivElement>(null);

    function openDrawing(drawing: DrawingData, index: number) {
        setLastDrawing(drawing);
        setFullscreenOpen(true);
        history.pushState(null, "", "");

        lastDrawingIdRef.current = index;
    }

    function closeView() {
        setFullscreenOpen(false);
    }

    function viewClicked(e: MouseEvent<HTMLDivElement>) {
        if(e.target == viewRef.current) {
            closeView();
        }
    }

    function nextDrawing() {
        if(lastDrawingIdRef.current == null) return;

        if(lastDrawingIdRef.current < drawings.length - 1) {
            const idx = lastDrawingIdRef.current + 1;
            openDrawing(drawings[idx], idx)
        }
    }

    function prevDrawing() {
        if(lastDrawingIdRef.current == null) return;

        if(lastDrawingIdRef.current > 0) {
            const idx = lastDrawingIdRef.current - 1;
            openDrawing(drawings[idx], idx)
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", (e) => {
            if(e.key == "Escape") {
                closeView();
            }
            
            if(lastDrawingIdRef.current != null) {
                if(e.key == "ArrowRight") {
                    nextDrawing();
                }

                if(e.key == "ArrowLeft") {
                    prevDrawing();
                }
            }
        });

        window.addEventListener("popstate", (e) => {
            closeView();
        })
    }, []);

    return (<>
        <div 
            id="drawing-view" 
            ref={viewRef}
            onClick={viewClicked}
            style={fullscreenOpen ? {visibility: "visible", opacity: "1"} : undefined}
        >
            <div id="drawing-view-meta">
                <h1>{lastDrawing?.title}</h1>
            </div>
            <img
                src={lastDrawing?.src}
                alt={lastDrawing?.title ?? "Image not loaded"} 
            />

            <ImageButton 
                img="/assets/img/icons/google/x.svg"
                id="drawing-view-close"
                ariaLabel="Close"
                onClick={closeView}
            />
        </div>

        <div id="drawings" className="observing anim-obs-fade">
            {
                drawings.map((v, i) => 
                    <Drawing 
                        data={v}
                        index={i}
                        openFunc={openDrawing}
                        key={`drawing-${i}`} 
                    />
                )
            }
        </div>
    </>);
}