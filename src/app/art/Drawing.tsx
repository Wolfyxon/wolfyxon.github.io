"use client";

import { capitalize } from "@/util/string";
import { MONTH_NAMES } from "@/util/time";
import { useEffect, useRef } from "react";

export type DrawingData = {
    title: string,
    date: string,
    src: string,
    note?: string
};

export default function Drawing(props: {
    data: DrawingData, 
    index: number,
    openFunc?: (drawing: DrawingData, index: number) => void
}) {
    const data = props.data;
    const date = new Date(data.date);
    const ref = useRef<HTMLDivElement>(null);

    function open() {
        if(props.openFunc) {
            props.openFunc(data, props.index);
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", (e) => {
            if(e.key == "Enter" && document.activeElement == ref.current) {
                open();
            }
        });
    }, []);

    return (
        <div className="drawing" onClick={open} tabIndex={0} ref={ref}>
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
                        `${capitalize(MONTH_NAMES[date.getMonth()])} ${date.getDate()}, ${date.getFullYear()}`
                    }
                </div>
            </div>
        </div>
    );
}
