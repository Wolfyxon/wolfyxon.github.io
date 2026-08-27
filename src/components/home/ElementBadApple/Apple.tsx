"use client";

import { KeyboardEvent, useState } from "react";
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

    function keyDown(e: KeyboardEvent) {
        if(e.key == "Enter") {
            click();
        }
    }

    return (<>
        {
            triggered
            ? <ElementBadApple/>
            : null
        }
        <img 
            src={"/assets/img/apple.webp"}
            id="apple" 
            onClick={click}
            onKeyDown={keyDown} 
            tabIndex={0}
            title="This apple looks bad..."
            alt="Apple" 
            width="50px"
        />
    </>)
}