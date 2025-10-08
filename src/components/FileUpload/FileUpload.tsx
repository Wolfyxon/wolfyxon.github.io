"use client";

import { ElmBase, classJoin, isHas } from "@/utils";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import "./style.css";

export const UPLOAD_NOTE_OFFLINE = "No stable internet required. Everything is handled locally in your browser";

export default function FileUpload(props: {
    accept: string,
    prefix?: string,
    note?: string,
    callback: (files: FileList) => boolean | string | string[] | undefined | null | void
} & ElmBase) {
    const [error, setError] = useState("");
    const ref = useRef<HTMLDivElement>(null);

    function inputChange(e: ChangeEvent) {
        const inp: HTMLInputElement = e.target as HTMLInputElement;

        if(!inp.files) {
            return;
        }

        filesDropped(inp.files);

        inp.files = null;
    }

    function filesDropped(files: FileList) {
        const result = props.callback(files);

        if(result != true && result !== null && result !== undefined) {       
            const resType = typeof(result);
            
            if(result === false) {
                setError("Error uploading files");
            } if(resType == "string") {
                setError(result as string);
            } if(resType == "object") {
                setError((result as string[]).join("\n"));
            }
        }
    }

    useEffect(() => {
        const div = ref.current!

        window.addEventListener("dragover", (e) => {
            e.preventDefault();
            
            if(isHas(e.target, div)) {
                div.classList.add("drag");
            }
        });

        window.addEventListener("dragleave", (e) => {
            const target = e.target as HTMLElement

            if(isHas(e.target, div)) {
                div.classList.remove("drag");
            }
        });

        window.addEventListener("drop", (e) => {
            e.preventDefault();
            div.classList.remove("drag");

            const files = e.dataTransfer?.files;

            if(files) {
                filesDropped(files);
            }
        });

        window.addEventListener("paste", (e) => {
            const files = e.clipboardData?.files;

            if(files) {
                filesDropped(files);
            }
        });

    }, []);

    const fileInput = (
        <input 
            onChange={inputChange} 
            type="file" 
            accept={props.accept} 
            aria-label="upload an audio file" 
            multiple
        />
    );

    return (
        <div id={props.id} className={classJoin("file-upload", props.className)} ref={ref}>
            <div className="file-upload-error">{error}</div>

            <div>{props.prefix ? props.prefix : "Drag and drop files or use"} {fileInput}</div>
            {
                props.note ?
                    <div className="faded">{props.note}</div>
                : null
            }
        </div>
    );
}
