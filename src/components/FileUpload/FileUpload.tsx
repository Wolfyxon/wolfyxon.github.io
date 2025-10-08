"use client";

import { ElmBase, classJoin } from "@/utils";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function FileUpload(props: {
    accept: string, 
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
            const target = e.target as HTMLElement

            if(target == div || target.contains(div)) {
                div.classList.add("drag");
            }
        });

        window.addEventListener("dragleave", (e) => {
            const target = e.target as HTMLElement

            if(target == div || target.contains(div)) {
                div.classList.remove("drag");
            }
        });

        window.addEventListener("drop", (e) => {
            e.preventDefault();

            const files = e.dataTransfer?.files;

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
            <div className="upload-error">{error}</div>

            <div>Add audio by dragging and dropping files or {fileInput}</div>
            <div className="faded">No stable internet required. Everything is handled locally in your browser.</div>
        </div>
    );
}