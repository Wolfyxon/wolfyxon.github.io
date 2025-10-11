"use client";

import { ElmBase, EventListener, classJoin, isHas } from "@/utils";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import "./style.css";

export const UPLOAD_NOTE_OFFLINE = "No stable internet required. Everything is handled locally in your browser";

export type FileUploadError = boolean | string | string[] | undefined | null | void;

export type FileUploadStatusCallback = (complete: boolean, errors: FileUploadError) => void;
export type FileDropCallback = (files: FileList, statusCallback: FileUploadStatusCallback) => FileUploadError | Promise<FileUploadError>;

export default function FileUpload(props: {
    accept: string,
    prefix?: string,
    note?: string,
    global?: boolean,
    callback: FileDropCallback
} & ElmBase) {
    const [error, setError] = useState("");
    const [uploadingCount, setUploadingCount] = useState(0);

    const ref = useRef<HTMLDivElement>(null);

    function inputChange(e: ChangeEvent) {
        const inp: HTMLInputElement = e.target as HTMLInputElement;

        if(!inp.files) {
            return;
        }

        filesDropped(inp.files);

        inp.files = null;
    }

    async function filesDropped(files: FileList): Promise<void> {
        return new Promise((resolve, reject) => {
            setUploadingCount(prev => prev + 1);

            let statusWait = false;

            function statusCallback(status: boolean, errors: FileUploadError) {
                if(!status) {
                    statusWait = true;
                } else {
                    if(!statusWait) {
                        throw "Status callback has to be first called with false";
                    }

                    processResult(errors);
                    finish();
                }
            }

            function finish() {
                setUploadingCount(prev => prev - 1);
                resolve();
            }

            function processResult(result: FileUploadError) {
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

            setTimeout(async () => {
                let result = props.callback(files, statusCallback);
                
                if(result instanceof Promise) {
                    let resolved = false;

                    setTimeout(() => {
                        if(!resolved) {
                            console.warn("File upload callback still not resolved. Did you forget to call resolve or used 'return' in the Promise function?");
                        }
                    }, 3000);

                    result = await result;
                    resolved = true;
                }
        
                processResult(result);
                
                if(!statusWait) {
                    finish();
                }
            });
        });
    }

    useEffect(() => {
        const div = ref.current!;
        
        const listeners: EventListener[] = [
            new EventListener(window, "dragover", (e) => {
                e.preventDefault();
            
                if(isHas(e.target, div) || props.global) {
                    div.classList.add("drag");
                }
            }),

            new EventListener(window, "dragleave", (e) => {
                if(isHas(e.target, div) || props.global) {
                    div.classList.remove("drag");
                }
            }),

            new EventListener(window, "drop", (e) => {
                e.preventDefault();
    
                if(!isHas(e.target, div) && !props.global) {
                    return;
                }
    
                div.classList.remove("drag");
    
                const files = (e as DragEvent).dataTransfer?.files;
    
                if(files) {
                    filesDropped(files);
                }
            }),

            new EventListener(window, "paste", (e) => {
                const files = (e as ClipboardEvent).clipboardData?.files;
    
                if(files && files.length != 0) {
                    filesDropped(files);
                }
            })
        ];

        return () => {
            listeners.forEach(l => l.disconnect());
        }
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
        <div id={props.id} className={`${classJoin("file-upload", props.className)} ${uploadingCount != 0 ? "uploading" : ""}`} ref={ref}>
            <div className="file-upload-main">
                <div className="file-upload-error">{error}</div>

                <div>{props.prefix ? props.prefix : "Drag and drop files or use"} {fileInput}</div>
                {
                    props.note ?
                        <div className="faded">{props.note}</div>
                    : null
                }
            </div>
            <div className="file-upload-uploading">
                <div>Uploading...</div>
            </div>
        </div>
    );
}
