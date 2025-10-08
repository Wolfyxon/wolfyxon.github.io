"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import FileUpload, { UPLOAD_NOTE_OFFLINE } from "@/components/FileUpload/FileUpload";
import ImageButton from "@/components/input/ImageButton/ImageButton";

import "./style.css";
import { getObjectURLBase64 } from "@/utils";

type BroadcastData = {
    msg: string,
} & Record<any, any>

export default function SlideShowControls(props: {
    fullscreen?: () => void,
    setSrc: Dispatch<SetStateAction<string>>
}) {
    const [slides, setSlides] = useState<string[]>([]);
    const [slideIdx, setSlideIdx] = useState(0);

    const bcRef = useRef<BroadcastChannel | null>(null);
    
    async function filesDroppedAsync(files: FileList): Promise<string[]> {
        const errs: string[] = [];
        const srcs: string[] = [];

        for(const file of files) {
            if(file.type.startsWith("image/")) {
                srcs.push(await getObjectURLBase64(file));
            } else {
                errs.push(`'${file.name}' is not an image: ${file.type}`);
            }
        }

        addSlides(srcs);

        return errs;
    }

    function addSlides(srcs: string[], publish?: boolean) {
        const wasEmpty = slides.length == 0;
        setSlides(old => [...old, ...srcs]);

        if(wasEmpty) {
            setSlide(0, false);
        }

        if(publish ?? true) {
            bcRef.current?.postMessage({
                msg: "addSlides",
                srcs: srcs
            });
        }
    }

    function filesDropped(files: FileList) {
        filesDroppedAsync(files);
    }

    function fullscreen() {
        if(props.fullscreen) {
            props.fullscreen();
        }
    }

    function previous(publish?: boolean) {
        if(slideIdx <= 0) {
            return;
        }

        setSlide(slideIdx - 1, publish);
    }

    function next(publish?: boolean) {
        if(slideIdx >= slides.length) {
            return;
        }

        setSlide(slideIdx + 1, publish);
    }

    function setSlide(index: number, publish?: boolean) {    
        setSlideIdx(index);

        if(publish ?? true) {
            bcRef.current?.postMessage({
                msg: "setSlide",
                index: index
            });
        }

        // Cursed but works. TODO: Find a better fix
        setSlides(slides => {
            props.setSrc(slides[index]);
            return slides;
        });
    }

    useEffect(() => {
        const bc = new BroadcastChannel("slideshow");
        bcRef.current = bc;

        bc.onmessage = (e) => {
            const data = e.data as BroadcastData;

            switch(data.msg) {
                case "setSlide": {
                    setSlide(data.index, false);
                    break;
                }
                case "addSlides": {
                    addSlides(data.srcs, false);
                    break;
                }
            }
        }

    }, []);

    return (
        <div className="slideshow-controls">
            <div className="slideshow-slides">
                {slides.map((src, i) => <img src={src} alt="Slide" width={100} key={`slide-${i}`} />)}
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
                    disabled={fullscreen == undefined}
                    onClick={fullscreen}
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
                {!props.fullscreen ? (
                    <p>Fullscreen is not supported with remote control</p>
                ) : null}
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