"use client";

import { ReactNode, useState } from "react";

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
    buttons?: AccordionButton[],
    children: ReactNode
} & ElmBase) {
    const [open, setOpen] = useState(props.open ?? false);

    function click() {
        setOpen(!open);
    }

    return (
        <div className={classJoin(`accordion ${open ? "open" : ""}`, props.className)} id={props.id}>
            <div onClick={click} className="accordion-button">
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
            <div className="accordion-content">
                {props.children}
            </div>
        </div>
    );
} 