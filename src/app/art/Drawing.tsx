"use client";

import { capitalize } from "@/util/string";
import { MONTHS } from "@/util/time";

export type DrawingData = {
    title: string,
    date: string,
    src: string
};

export default function Drawing(props: {
    data: DrawingData, 
    index: number,
    openFunc?: (drawing: DrawingData, index: number) => void
}) {
    const data = props.data;
    const date = new Date(data.date);

    function open() {
        if(props.openFunc) {
            props.openFunc(data, props.index);
        }
    }

    return (
        <div className="drawing" onClick={open}>
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
