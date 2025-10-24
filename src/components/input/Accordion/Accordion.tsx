"use client";

import { ReactNode, useState } from "react";

import "./style.css";
import { ElmBase, classJoin } from "@/util/dom";

export default function Accordion(props: {
    title: string, 
    open?: boolean, 
    children: ReactNode
} & ElmBase) {
    const [open, setOpen] = useState(props.open ?? false);

    function click() {
        setOpen(!open);
    }

    return (
        <div className={classJoin(`accordion ${open ? "open" : ""}`, props.className)} id={props.id}>
            <button onClick={click} className="accordion-button">
                <label>{props.title}</label>
            </button>
            <div className="accordion-content">
                {props.children}
            </div>
        </div>
    );
} 