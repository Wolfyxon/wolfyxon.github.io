"use client";

import { useState } from "react";
import ElementBadApple from "./ElementBadApple";

import "./appleStyle.css";

export default function Apple() {
    const [triggered, setTriggered] = useState(false);

    function click() {
        if(!confirm("You are about to see a rapidly flashing content. \nPress 'ok' to continue")) {
            return;
        }

        setTriggered(true);
        window.scrollTo(0, 0);
    }

    return (<>
        {
            triggered
            ? <ElementBadApple/>
            : null
        }
        <img src={"/assets/img/apple.webp"} id="apple" onClick={click} alt="Apple" width="50px"/>
    </>)
}