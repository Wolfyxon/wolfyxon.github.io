"use client";

import Checkbox from "@/components/input/Checkbox/Checkbox";
import ImageButton from "@/components/input/ImageButton/ImageButton";
import { clamp, lerp, removeExtension } from "@/utils";
import { ChangeEvent, Dispatch, ReactNode, RefObject, SetStateAction, useEffect, useState } from "react";
import HeaderSwitch from "./HeaderSwitch";
import LeaveBlocker from "@/components/func/LeaveBlocker";
import Slider from "@/components/input/Slider/Slider";
import HSeparator from "@/components/separators/HSeparator";

type AudioData = {
    elm?: ReactNode,
    ref?: RefObject<null>,
    file: File,
    targetVolume: number,
    audio: HTMLAudioElement,
    stopped: boolean
}

export default function PlayerPageClient() {
    const [uploadError, setUploadError] = useState<string>("");
    const [audios, setAudios] = useState<AudioData[]>([]);
    
    const [fadeSpeed, setFadeSpeed] = useState(0.01);
    const [globalVolume, setGlobalVolume] = useState(100);

    const [askBeforeLeaving, setAskBeforeLeaving] = useState(true);
    const [askBeforeDeleting, setAskBeforeDeleting] = useState(false);
    
    const [currentAudio, setCurrentAudio] = useState<AudioData | null>(null);

    function addUploadError(text: string) {
        setUploadError(uploadError + text + "\n");
    }

    function addAudio(file: File) {
        if(!(file.type === "application/ogg" || file.type.startsWith("audio/"))) {
            addUploadError(`${file.name} is not an audio file: ${file.type}`);
            return;
        }

        const data: AudioData = {
            audio: new Audio(URL.createObjectURL(file)),
            file: file,
            targetVolume: 0,
            stopped: false
        }

        setAudios(prev => [...prev, data]);
    }

    function stop() {
        if(currentAudio) {
            currentAudio.stopped = true;
            setCurrentAudio(null);
        }
    }

    function pause() {
        setCurrentAudio(null);
    }

    function filesSelected(e: ChangeEvent) {
        const inp: HTMLInputElement = e.target as HTMLInputElement;

        if(!inp.files) {
            return;
        }

        for(const f of inp.files) {
            addAudio(f);
        }

        inp.files = null;
    }


    let lastFrame = Date.now();
    
    useEffect(() => {
        let frame: number;

        const loop = () => {
            const now = Date.now();
            const delta = now - lastFrame;

            lastFrame = now;
    
            for(const audio of audios) {
                let vol = 0;
                
                if(audio == currentAudio) {
                    vol = 1;

                    if(audio.audio.currentTime == audio.audio.duration) {
                        setCurrentAudio(null);
                    }
                }
    
                audio.targetVolume = lerp(audio.targetVolume, vol, fadeSpeed * 0.1 * delta);
                audio.audio.volume = clamp(audio.targetVolume * (globalVolume / 100), 0, 1);
    
                if(audio != currentAudio && audio.targetVolume <= 0.02) {
                    audio.audio.pause();
    
                    if(audio.stopped) {
                        audio.audio.currentTime = 0;
                        audio.stopped = false;                  
                    }
    
                }
            }

            frame = requestAnimationFrame(loop);
        };

        frame = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(frame);

    }, [currentAudio, globalVolume, fadeSpeed]);

    useEffect(() => {
        const body = document.body;

        window.addEventListener("dragover", (e) => {
            e.preventDefault();
            body.classList.add("drag");
        });

        window.addEventListener("dragleave", () => {
            body.classList.remove("drag");
        })

        window.addEventListener("drop", (e) => {
            e.preventDefault();
            body.classList.remove("drag");

            const files = e.dataTransfer?.files;

            if(!files) {
                setUploadError("No files");
                return;
            }

            for(const f of files) {
                addAudio(f);
            }
        });
    }, []);

    const fileInput = (
        <input 
            onChange={filesSelected} 
            type="file" 
            accept="audio/*" 
            aria-label="upload an audio file" 
            multiple
        />
    );

    const [lockChecks, setLockChecks] = useState(false);
    const [lockSliders, setLockSliders] = useState(false);
    

    return (<>
        <div id="audios">{audios.length != 0 ? audios.map((audio, i) => 
            <AudioEntry 
                data={audio} 
                currentAudio={currentAudio}
                setAudios={setAudios} 
                setCurrentAudio={setCurrentAudio}
                askBeforeDeleting={askBeforeDeleting}
                key={`audio-${i}-${audio.file.size}`} />)
            
            : <p className="faded">No audios yet...</p>}</div>

        <div id="upload-container">
            <div id="upload-error">{uploadError}</div>

            <div>Add audio by dragging and dropping files or {fileInput}</div>
            <div className="faded">No stable internet required. Everything is handled locally in your browser.</div>
        </div>

        <div id="panel">
            <div id="controls">
                <ImageButton 
                    label="Pause" 
                    img="/assets/media/img/icons/google/pause.svg"
                    disabled={!currentAudio}
                    onClick={pause}/>
                
                <ImageButton 
                    label="Stop" 
                    img="/assets/media/img/icons/google/stop.svg" 
                    disabled={!currentAudio}
                    onClick={stop} />
            </div>
        </div>
        <div id="settings">
            <div id="switches">
                <Checkbox label="Lock" flat checked={lockChecks} onChange={setLockChecks} />
                <HSeparator />

                <HeaderSwitch disabled={lockChecks} />
                <Checkbox label="Ask before leaving" checked={askBeforeLeaving} onChange={setAskBeforeLeaving} disabled={lockChecks} />
                <Checkbox label="Ask before deleting audio" checked={askBeforeDeleting} onChange={setAskBeforeDeleting} disabled={lockChecks} />
            </div>
            <div id="ranges">
                <Checkbox label="Lock" flat checked={lockSliders} onChange={setLockSliders} />
                <HSeparator />

                <Slider label="Global volume" onChange={setGlobalVolume} value={globalVolume} disabled={lockSliders} />
                <Slider label="Fade speed" onChange={setFadeSpeed} value={fadeSpeed} min={0.0001} max={0.5} step={0.0001} disabled={lockSliders} />
            </div>
        </div>

        <LeaveBlocker enabled={audios.length != 0 && askBeforeLeaving} />
    </>);
}

function AudioEntry(props: {
        data: AudioData, 
        currentAudio: AudioData | null,
        setAudios: Dispatch<SetStateAction<AudioData[]>>, 
        setCurrentAudio: Dispatch<SetStateAction<AudioData | null>>,
        askBeforeDeleting?: boolean
    }) {

    const data = props.data;
    const audio = data.audio;
    
    const isCurrent = props.currentAudio == data;

    function remove() {
        if(props.askBeforeDeleting && !confirm("Are you sure you want to remove this audio?")) {
            return
        }

        audio.pause();
        audio.remove();

        props.setAudios((prev) => prev.filter((v) => v != data));
    }

    function playPause() {
        if(isCurrent) {
            props.setCurrentAudio(null);
        } else {
            data.stopped = false;
            props.setCurrentAudio(data);
            
            if(audio.paused) {    
                audio.play();
            }
        }
    }

    function stop() {
        if(isCurrent) {
            data.stopped = true;
            props.setCurrentAudio(null);
        } else {
            data.audio.currentTime = 0;
        }
    }

    const name = removeExtension(props.data.file.name);

    return (
        <div className={`audio ${isCurrent ? "current" : ""}`}>
            <input type="text" defaultValue={name} placeholder={name} className="audio-title" />
            
            <ImageButton 
                label={
                    isCurrent ?
                      "Pause"
                    : "Play"
                } 
                img={isCurrent ?
                      "/assets/media/img/icons/google/pause.svg"
                    : "/assets/media/img/icons/google/play.svg"
                }
                className="play-pause-btn"
                onClick={playPause} />

            {/*
                isCurrent ?
                  <ImageButton label="Pause" img="/assets/media/img/icons/google/pause.svg" onClick={playPause} />
                : <ImageButton label="Play" img="/assets/media/img/icons/google/play.svg" onClick={playPause} />
            */}
            <ImageButton label="Stop" img="/assets/media/img/icons/google/stop.svg" onClick={stop} />
            <ImageButton label="Delete" img="/assets/media/img/icons/google/delete.svg" onClick={remove} />
        </div>
    );
}
