"use client";

import ImageButton from "@/components/input/ImageButton/ImageButton";
import { capitalize } from "@/util/string";
import { MONTHS } from "@/util/time";
import { useEffect, useState } from "react";

export type DrawingData = {
    title: string,
    date: string,
    src: string
};

export default function Drawing(props: {data: DrawingData}) {
    const data = props.data;
    const date = new Date(data.date);

    const [isOpenFullscreen, setOpenFullscreen] = useState(false);

    function open() {
        if(isOpenFullscreen) return;

        setOpenFullscreen(true)
    }

    function close() {
        setOpenFullscreen(false);
    }

    useEffect(() => {
        window.addEventListener("keydown", (e) => {
            if(e.key == "Escape") {
                close();
            }
        });
    }, []);

    return (
        <div className="drawing observing anim-obs-fade" onClick={open}>
            <div className="drawing-fullscreen" style={isOpenFullscreen ? {visibility: "visible", opacity: "1"} : undefined}>
                <img
                    src={data.src}
                    alt={data.title} 
                />

                <ImageButton 
                    img="/assets/img/icons/google/x.svg"
                    className="drawing-fullscreen-close"
                    ariaLabel="Close"
                    onClick={close}
                 />
            </div>

            <img
                className="drawing-preview" 
                src={data.src} 
                alt={data.title} 
            />
            
            <div className="drawing-text">
                <div className="drawing-title">
                    {data.title}
                </div>

                <div className="drawing-date">
                    {
                        `${capitalize(MONTHS[date.getMonth()])} ${date.getDate()}, ${date.getFullYear()}`
                    }
                </div>
            </div>
        </div>
    );
}
