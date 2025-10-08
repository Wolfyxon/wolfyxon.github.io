"use client";

import ImageButton from "@/components/input/ImageButton/ImageButton";

import "./style.css";
import { Dispatch, SetStateAction, useState } from "react";
import FileUpload, { UPLOAD_NOTE_OFFLINE } from "@/components/FileUpload/FileUpload";

export default function SlideShowControls(props: {
    fullscreen: () => void,
    setSrc: Dispatch<SetStateAction<string>>
}) {
    const [slides, setSlides] = useState<string[]>([]);
    
    function filesDropped(files: FileList): string[] {
        const errs: string[] = [];
        const srcs: string[] = [];

        for(const file of files) {
            if(file.type.startsWith("image/")) {
                srcs.push(URL.createObjectURL(file));
            } else {
                errs.push(`'${file.name}' is not an image: ${file.type}`);
            }
        }

        setSlides(old => [...old, ...srcs]);

        return errs;
    }


    function previous() {

    }

    function next() {
        
    }

    return (
        <div className="slideshow-controls">
            <div className="slideshow-slides">
                {slides.map(src => <img src={src} alt="Slide" width={100} />)}
            </div>
            <FileUpload
                prefix="Drag and drop images, paste with Ctrl+V or use"
                note={UPLOAD_NOTE_OFFLINE}
                accept="image/*" 
                callback={filesDropped}
                global
            />
            <div className="slideshow-controls-buttons">
                <ImageButton
                    img="/assets/media/img/icons/google/fullscreen.svg" 
                    label="Fullscreen"
                    onClick={props.fullscreen}
                />

                <ImageButton
                    img="/assets/media/img/icons/google/prev.svg" 
                    label="Previous"
                    onClick={previous}
                />

                <ImageButton
                    img="/assets/media/img/icons/google/next.svg" 
                    label="Previous"
                    onClick={next}
                />
            </div>
            <div>
                <label>
                    <span>Arrow modifier key </span>

                    <select defaultValue="Control">
                        <option>None</option>
                        <option>Control</option>
                        <option>Shift</option>
                    </select>
                </label>
            </div>
        </div>
    );
}