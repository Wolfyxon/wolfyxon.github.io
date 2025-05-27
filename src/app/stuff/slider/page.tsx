"use client";

import { useEffect, useRef, useState } from "react";

import "@/app/css/bigCenter.css";

export default function SliderPage() {
    const [size, setSize] = useState(200);
    const sliderRef = useRef<HTMLInputElement>(null);

    function update() {
        setSize(parseInt(sliderRef.current!.value));
    }

    useEffect(update, []);

    return (
        <>
            <div>
                <input type="range" onChange={update} ref={sliderRef} value={size} min={0} max={1000} />
                <span>{size}px</span>
            </div>

            <img src="/assets/media/img/maxwell.jpg" style={{width: size, height: size}} />
        </>
    )
}