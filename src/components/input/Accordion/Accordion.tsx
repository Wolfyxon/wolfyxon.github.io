"use client";

import { ReactNode, useState } from "react";

import "./style.css";

export default function Accordion(props: {title: string, open?: boolean, children: ReactNode}) {
    const [open, setOpen] = useState(props.open ?? false);

    function click() {
        setOpen(!open);
    }

    return (
        <div className={`accordion ${open ? "open" : ""}`}>
            <button onClick={click} className="accordion-button">
                <label>{props.title}</label>
            </button>
            <div className="accordion-content">
                {props.children}
            </div>
        </div>
    );
} 