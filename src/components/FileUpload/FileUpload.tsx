"use client";

import { ChangeEvent, useEffect, useState } from "react";

export default function FileUpload(props: {
    accept: string, 
    callback: (files: FileList) => boolean | string | string[] | undefined | null
}) {
    const [error, setError] = useState("");

    function inputChange(e: ChangeEvent) {
        const inp: HTMLInputElement = e.target as HTMLInputElement;

        if(!inp.files) {
            return;
        }

        const result = props.callback(inp.files);

        if(result != true && result !== null && result !== undefined) {       
            const resType = typeof(result);
            
            if(result === false) {
                setError("Error uploading files");
            } if(resType == "string") {
                setError(result as string);
            }
        }

        inp.files = null;
    }

    useEffect(() => {

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
        <div className="file-upload">
            <div className="upload-error">{error}</div>

            <div>Add audio by dragging and dropping files or {fileInput}</div>
            <div className="faded">No stable internet required. Everything is handled locally in your browser.</div>
        </div>
    );
}