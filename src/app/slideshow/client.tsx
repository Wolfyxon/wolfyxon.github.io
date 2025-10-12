"use client";

import { useRef, useState } from "react";
import SlideShowControls, { SlideData } from "./controls/SlideShowControls";

export default function SlideShowPageClient() {
    
    const [currentlide, setCurrentSlide] = useState<SlideData | null>(null);
    const previewRef = useRef<HTMLImageElement>(null);

    function fullscreen() {
        previewRef.current?.requestFullscreen();
    }
    
    return (
        <div className="slideshow-page-container">
            <div className="slideshow-preview">
                <img 
                    alt="Slide" 
                    className="slideshow-preview-img"
                    width={400}
                    height={400}
                    src={currentlide?.src ?? "/assets/media/img/maxwell.jpg"}
                    ref={previewRef}
                />
            </div>
            
            <SlideShowControls
                fullscreen={fullscreen}
                setSlide={setCurrentSlide}
            />
        </div>
    );
}
