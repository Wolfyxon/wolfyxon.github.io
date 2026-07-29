"use client";

import { useEffect } from "react";

export default function Saul() {
    function trigger() {
        for(const elm of document.querySelectorAll("a, h1, p, main")) {
            (elm as any).style.background = "url('/assets/img/saul.gif')";            
        }

        for(const elm of document.querySelectorAll("img")) {
            (elm as any).src = "/assets/img/saul.gif";
        }
    }

    useEffect(() => {
        let buf = "";

        console.log("Select 's' 'a' 'u' and 'l' in order, in any text on the site");

        document.addEventListener("selectionchange", (e) => {
            if(buf.length > 1024) {
                buf = "";
            }

            const sel = window.getSelection()!;
            
            if(!sel) {
                return;
            }

            const txt = sel.toString();
            buf += txt;
            
            if(buf.toLocaleLowerCase().includes("saul")) {
                trigger();
            }
        });
    }, []);
    
    return (<></>);
}