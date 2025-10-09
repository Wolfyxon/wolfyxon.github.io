"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { getObjectURLBase64 } from "@/utils";
import FileUpload, { UPLOAD_NOTE_OFFLINE } from "@/components/FileUpload/FileUpload";
import ImageButton from "@/components/input/ImageButton/ImageButton";

import "./style.css";

type BroadcastData = {
    msg: string,
    origin: string,
    target?: string,
} & Record<any, any>

export default function SlideShowControls(props: {
    hideUpload?: boolean,
    fullscreen?: () => void,
    setSrc: Dispatch<SetStateAction<string>>
}) {
    const [slides, setSlides] = useState<string[]>([]);
    const [slideIdx, setSlideIdx] = useState(0);

    const bcRef = useRef<BroadcastChannel | null>(null);
    const originRef = useRef<string | null>(null);
    
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
                origin: originRef.current,
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
        if(slideIdx >= slides.length - 1) {
            return;
        }

        setSlide(slideIdx + 1, publish);
    }

    function setSlide(index: number, publish?: boolean) {    
        setSlideIdx(index);

        if(publish ?? true) {
            bcRef.current?.postMessage({
                msg: "setSlide",
                origin: originRef.current,
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

            if(data.origin == originRef.current) {
                return;
            }

            if(data.target && data.target != originRef.current) {
                return;
            }

            switch(data.msg) {
                case "setSlide": {
                    setSlide(data.index, false);
                    break;
                }
                case "addSlides": {
                    addSlides(data.srcs, false);
                    break;
                }
                case "setSlides": {
                    if(data.srcs.length > 50) {
                        console.error("too much!");
                        return;
                    }

                    setSlides(data.srcs);
                    break;
                }
                case "getSlides": {
                    bcRef.current?.postMessage({
                        msg: "setSlides",
                        origin: originRef.current,
                        target: data.origin,
                        srcs: slides
                    });
                }
            }
        }

        return () => bc.close();
    }, [slides]);

    useEffect(() => {
        if(originRef.current) {
            return;
        }

        originRef.current = Math.random().toString() + new Date();

        bcRef.current?.postMessage({
            msg: "getSlides",
            origin: originRef.current,
        });
    }, []);

    return (
        <div className="slideshow-controls">
            <div className="slideshow-slides">
                {slides.map((src, i) => <img 
                    src={src}
                    alt="Slide" 
                    width={100} 
                    height={100} 
                    key={`slide-${i}`}
                    className={i == slideIdx ? "current" : undefined} 
                />)}
            </div>
            {
                !props.hideUpload ?
                    <FileUpload
                        prefix="Drag and drop images, paste with Ctrl+V or use"
                        note={UPLOAD_NOTE_OFFLINE}
                        accept="image/*" 
                        callback={filesDropped}
                    />
                : null
            }
            <div className="slideshow-controls-buttons">
                <ImageButton
                    img="/assets/media/img/icons/google/fullscreen.svg" 
                    label="Fullscreen"
                    disabled={!props.fullscreen}
                    onClick={fullscreen}
                />

                <ImageButton
                    img="/assets/media/img/icons/google/prev.svg" 
                    label="Previous"
                    onClick={previous}
                />

                <ImageButton
                    img="/assets/media/img/icons/google/next.svg" 
                    label="Next"
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
            <a href="/slideshow" target="_blank">Open new instance for remote control</a>
        </div>
    );
}