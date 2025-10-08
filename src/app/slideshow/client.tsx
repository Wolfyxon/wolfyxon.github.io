"use client";

import { useRef, useState } from "react";
import SlideShowControls from "./controls/SlideShowControls";

export default function SlideShowPageClient() {
    
    const [currentSrc, setCurrentSrc] = useState("/assets/media/img/maxwell.jpg");
    const previewRef = useRef<HTMLImageElement>(null);

    function fullscreen() {
        previewRef.current?.requestFullscreen();
    }
    
    return (
        <div className="slideshow-page-container">
            <img 
                alt="Slide" 
                className="slideshow-preview"
                width={400}
                height={400}
                src={currentSrc}
                ref={previewRef}
            />


            <SlideShowControls 
                fullscreen={fullscreen}
                setSrc={setCurrentSrc}
            />
        </div>
    );
}
