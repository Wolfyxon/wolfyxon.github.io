"use client";

import { useRef, useState } from "react";
import SlideShowControls, { SlideData } from "./controls/SlideShowControls";

export default function SlideShowPageClient() {
    
    const [currentlide, setCurrentSlide] = useState<SlideData | null>(null);

    const previewRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    function fullscreen() {
        previewRef.current!.requestFullscreen();
    }
    
    function playVideo() {
        videoRef.current!.play();
    }

    function pauseVideo() {
        videoRef.current!.pause();
    }

    function stopVideo() {
        videoRef.current!.pause();
        videoRef.current!.currentTime = 0;
    }

    return (
        <div className="slideshow-page-container">
            <div className="slideshow-preview" ref={previewRef}>
                {
                    currentlide && currentlide.blob.type.startsWith("video/") ?
                    (
                        <video
                            style={currentlide && currentlide.blob.type.startsWith("video/") ? undefined : {
                                display: "none"
                            }}
                            width={400}
                            height={400}
                            ref={videoRef}
                        >
                            <source type={currentlide?.blob.type} src={currentlide?.src} />        
                            Video not supported
                        </video>
                    ) :
                    (
                        <img
                            style={currentlide && currentlide.blob.type.startsWith("video/") ? {
                                display: "none"
                            } : undefined}
                            alt="Slide" 
                            className="slideshow-preview-img"
                            width={400}
                            height={400}
                            src={currentlide?.src ?? "/assets/media/img/maxwell.jpg"}
                            ref={imgRef}
                        />
                    )
                }

            </div>
            
            <SlideShowControls
                fullscreen={fullscreen}
                setSlide={setCurrentSlide}
                playVideo={playVideo}
                pauseVideo={pauseVideo}
                stopVideo={stopVideo}
            />
        </div>
    );
}
