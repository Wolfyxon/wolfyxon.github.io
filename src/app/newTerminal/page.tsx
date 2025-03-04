"use client";

import { useEffect } from "react";
import { getConsole, getInput } from "./terminal";
import { CommandRunContext } from "./Command";

import "./terminal.css";

export default function TerminalPage() {
    useEffect(() => {
        const input = getInput();
        const termConsole = getConsole();

        let currentCtx: CommandRunContext | undefined;

        function sendText(text: string) {
            if(text === "^C") {
                sigTerm();
                return;
            }

            if(!currentCtx) return;
        }

        function execute() {
            
        }

        function sigTerm() {
            // TODO
        }

        function focusInput() {
            input.focus();
        }

        window.addEventListener("keydown", (e) => {
            if(document.activeElement !== input) return;
    
            if(e.key == "Enter") {
                const txt = input.value;
                input.value = "";
                sendText(txt);
            }
    
            if(e.ctrlKey && e.key === "c") {
                getInput().value += "^C";
                sigTerm();
            }
        });

        document.addEventListener("click", (e) => {
            const sel = document.getSelection();
            
            if(!sel || sel.isCollapsed) {
                focusInput();
            }
        });
        focusInput();
    }, []);

    return (
        <>
            <pre id="console"></pre>
            <div id="input-container">
                 <span id="prompt">
                    [<span className="username">root</span>@<span className="hostname">wolfyxon</span> <span className="dir" id="dir">/</span>]#
                </span>
                <span id="input" contentEditable>hi</span>
            </div>
        </>
    );
}