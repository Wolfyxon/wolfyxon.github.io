"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import ImageButton from "@/components/input/ImageButton/ImageButton";
import Drawing from "./Drawing";
import { DRAWINGS, DrawingData } from "./drawingData";
import { capitalize } from "@/util/string";
import { MONTH_NAMES } from "@/util/time";

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
        lastDrawingIdRef.current = null;
        setFullscreenOpen(false);
    }

    function viewClicked(e: MouseEvent<HTMLDivElement>) {
        if(e.target == viewRef.current) {
            closeView();
        }
    }

    function nextDrawing() {
        if(lastDrawingIdRef.current == null) return;

        if(lastDrawingIdRef.current < DRAWINGS.length - 1) {
            const idx = lastDrawingIdRef.current + 1;
            openDrawing(DRAWINGS[idx], idx)
        }
    }

    function prevDrawing() {
        if(lastDrawingIdRef.current == null) return;

        if(lastDrawingIdRef.current > 0) {
            const idx = lastDrawingIdRef.current - 1;
            openDrawing(DRAWINGS[idx], idx)
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
            <div id="drawing-view-meta-container">
                <ImageButton img="/assets/img/icons/google/info.svg" />
                <div id="drawing-view-meta">
                    <h1>{lastDrawing?.title}</h1>
                    <p id="drawing-view-meta-date">{(() => {
                        if(!lastDrawing) return;

                        const date = new Date(lastDrawing.date);
                        return `${capitalize(MONTH_NAMES[date.getMonth()])} ${date.getDate()}, ${date.getFullYear()}`
                    })()}</p>
                    <p>{lastDrawing?.note}</p>
                </div>
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
                DRAWINGS.map((v, i) => 
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