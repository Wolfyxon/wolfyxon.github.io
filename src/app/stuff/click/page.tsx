"use client";

import { useState } from "react";

import "@/app/css/bigCenter.css";

export default function Clicker() {
    const [clicks, setClicks] = useState(0);

    function click() {
        setClicks(clicks + 1);
    }

    return (
        <>
            <p>Clicks: {clicks}</p>
            <button onClick={click}>Click me</button>
        </>
    )
}
