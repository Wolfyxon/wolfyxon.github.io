"use client";

import { KeyboardEvent, ReactNode, useRef, useState } from "react";

import "./style.css";
import { ElmBase, classJoin } from "@/util/dom";

export type AccordionButton = {
    icon: string,
    name: string,
    onClick: () => any
}

export default function Accordion(props: {
    title: string, 
    open?: boolean, 
    overflow?: boolean,
    buttons?: AccordionButton[],
    children: ReactNode
} & ElmBase) {
    const [open, setOpen] = useState(props.open ?? false);
    
    function click() {
        setOpen(!open);
    }

    function keydown(e: KeyboardEvent) {
        if((e.key == "Enter" || e.key == " ") && document.activeElement == e.target) {
            e.preventDefault();
            setOpen(!open);
        }
    }

    return (
        <div className={classJoin(`accordion ${open ? "open" : ""}`, props.className)} id={props.id}>
            <div onClick={click} className="accordion-button" tabIndex={0} onKeyDown={keydown}>
                <div></div>
                <label>{props.title}</label>
                <div className="accordion-buttons">
                    {
                        props.buttons ?
                            props.buttons.map((btn, i) =>
                                <button title={btn.name} onClick={btn.onClick} key={"btn-" + i}>
                                    <img src={btn.icon}/>
                                </button>
                            )
                        : null
                    }
                </div>
            </div>
            <div className="accordion-content-container">
                <div className={`accordion-content ${props.overflow ? "overflowing" : ""}`}>
                    {props.children}
                </div>
            </div>
        </div>
    );
} 