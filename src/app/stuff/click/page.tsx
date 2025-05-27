"use client";

import { useState } from "react";

import "@/app/css/bigCenter.css";

export default function Clicker() {
    const [klikniecia, ustawKlikniecia] = useState(0);

    function klik() {
        ustawKlikniecia(klikniecia + 1);
    }

    return (
        <>
            <p>Ilość kliknięć: {klikniecia}</p>
            <button onClick={klik}>Kliknij</button>
        </>
    )
}
