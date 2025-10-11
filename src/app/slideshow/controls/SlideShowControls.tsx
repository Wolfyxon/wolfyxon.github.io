"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { EventListener, inputHandled } from "@/utils";
import FileUpload, { FileUploadStatusCallback, UPLOAD_NOTE_OFFLINE } from "@/components/FileUpload/FileUpload";
import ImageButton from "@/components/input/ImageButton/ImageButton";

import Accordion from "@/components/input/Accordion/Accordion";
import Checkbox from "@/components/input/Checkbox/Checkbox";
import LeaveBlocker from "@/components/func/LeaveBlocker";

import "./style.css";

type BroadcastData = {
    msg: string,
    origin: string,
    target?: string,
} & Record<any, any>

type SlideData = {
    blob: Blob,
    src?: string
}

export default function SlideShowControls(props: {
    hideUpload?: boolean,
    fullscreen?: () => void,
    setSrc: Dispatch<SetStateAction<string>>
}) {
    const [slides, setSlides] = useState<SlideData[]>([]);
    const [slideIdx, setSlideIdx] = useState(0);

    const [navKeys, setNavKeys] = useState("Q & E");
    const [navModifier, setNavModifier] = useState("Shift");
    
    const bcRef = useRef<BroadcastChannel | null>(null);
    const originRef = useRef<string | null>(null);
    
    async function filesDroppedAsync(files: FileList, status: FileUploadStatusCallback): Promise<string[]> {
        status(false);

        const errs: string[] = [];
        const newSlides: SlideData[] = [];

        for(const file of files) {
            if(file.type.startsWith("image/")) {
                newSlides.push(hydrateSlide({
                    blob: file
                }));
            } else {
                errs.push(`'${file.name}' is not an image: ${file.type}`);
            }
        }

        addSlides(newSlides);
        status(true);

        return errs;
    }

    function stripSlide(slide: SlideData): SlideData {
        return {
            blob: slide.blob,
        }
    }

    function hydrateSlide(slide: SlideData): SlideData {
        if(slide.src) {
            return slide;
        }

        return {
            blob: slide.blob,
            src: URL.createObjectURL(slide.blob)
        }
    }

    function addSlides(newSlides: SlideData[], publish?: boolean) {
        const wasEmpty = slides.length == 0;
        setSlides(old => [...old, ...newSlides]);

        if(wasEmpty) {
            setSlide(0, false);
        }

        if(publish ?? true) {
            bcRef.current?.postMessage({
                msg: "addSlides",
                origin: originRef.current,
                slides: newSlides.map((v) => stripSlide(v))
            });
        }
    }

    function filesDropped(files: FileList, status:  FileUploadStatusCallback) {
        filesDroppedAsync(files, status);
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
            props.setSrc(slides[index].src!);
            return slides;
        });
    }

    function deleteCurrent() {
        if(slides.length != 0) {
            // TODO: Fix this taking ages with large amounts of images
            setSlides(slides.filter((v, i) => i != slideIdx ));
        }
    }

    function deleteAll() {
        if(confirm("Do you want to delete ALL slides? (no undo)")) {
            setSlides([]);
        }
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
                    addSlides(data.slides.map((v: SlideData) => hydrateSlide(v)), false);
                    break;
                }
                case "setSlides": {
                    if(data.slides.length > 100) {
                        console.error("too much!");
                        return;
                    }

                    setSlides(data.slides.map((v: SlideData) => hydrateSlide(v)));
                    break;
                }
                case "getSlides": {
                    bcRef.current?.postMessage({
                        msg: "setSlides",
                        origin: originRef.current,
                        target: data.origin,
                        slides: slides.map((v: SlideData) => stripSlide(v))
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

    useEffect(() => {
        const lis = [
            new EventListener(window, "keydown", (_e) => {
                const e = _e as KeyboardEvent;
                const key = e.key.toLowerCase();

                if(inputHandled(e)) {
                    return;
                }

                if(navModifier != "None") {
                    if(navModifier == "Shift" && !e.shiftKey) {
                        return;
                    }

                    if(navModifier == "Control" && !e.ctrlKey) {
                        return;
                    }

                    if(navModifier == "Alt" && !e.altKey) {
                        return;
                    }
                }

                if(navKeys == "Q & E") {
                    if(key == "e") {
                        next();
                        e.preventDefault();
                    } else if(key == "q") {
                        previous();
                        e.preventDefault();
                    }
                }

                if(navKeys == "Arrows") {
                    if(key == "ArrowRight") {
                        next();
                        e.preventDefault();
                    } else if(key == "ArrowLeft") {
                        previous();
                        e.preventDefault();
                    }
                }
            })
        ];

        return () => {
            lis.forEach(l => l.disconnect());
        }
    }, [navKeys, navModifier, slideIdx, slides]);

    const [lockDelete, setLockDelete] = useState(false);
    const [askLeave, setAskLeave] = useState(true);
    
    return (
        <div className="slideshow-controls">
            <LeaveBlocker enabled={askLeave && slides.length != 0} />

            <div className="slideshow-slides">
                {slides.map((slide, i) => <img 
                    src={slide.src!}
                    alt="Slide" 
                    width={100} 
                    height={100} 
                    key={`slide-${i}`}
                    onClick={() => setSlide(i)}
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
                    label="Fullscreen this tab"
                    disabled={!props.fullscreen}
                    onClick={fullscreen}
                />

                <div className="slideshow-pn-buttons">
                    <ImageButton
                        img="/assets/media/img/icons/google/prev.svg" 
                        label="Previous"
                        onClick={previous}
                    />

                    <ImageButton
                        img="/assets/media/img/icons/google/next.svg" 
                        label="Next"
                        onClick={next}
                        reverse
                    />
                </div>

                <ImageButton 
                    img="/assets/media/img/icons/google/delete.svg"
                    label="Delete selected"
                    onClick={deleteCurrent}
                    disabled={lockDelete}
                />

                <ImageButton 
                    img="/assets/media/img/icons/google/delete.svg"
                    label="Delete all"
                    onClick={deleteAll}
                    disabled={lockDelete}
                />
            </div>
            <Accordion title="Settings">
                <div className="slideshow-settings">
                    <label>
                        <span>Navigation keys: </span>
                        <select defaultValue={navKeys}>
                            <option>Arrows</option>
                            <option>Q & E</option>
                        </select>
                    </label>

                    <label>
                        <span>Key modifier: </span>

                        <select defaultValue={navModifier}>
                            <option>None</option>
                            <option>Control</option>
                            <option>Shift</option>
                        </select>
                    </label>

                    <Checkbox label="Lock deleting" checked={lockDelete} onChange={setLockDelete} flat />
                    <Checkbox label="Ask before leaving" checked={askLeave} onChange={setAskLeave} flat />
                    
                </div>
            </Accordion>
            <a href="/slideshow" target="_blank">Open new instance for remote control</a>
        </div>
    );
}