"use client";

import ImageButton from "@/components/ImageButton/ImageButton";
import { clamp, lerp, removeExtension } from "@/utils";
import { ChangeEvent, Dispatch, ReactNode, RefObject, SetStateAction, useEffect, useState } from "react";

type AudioData = {
    elm?: ReactNode,
    ref?: RefObject<null>,
    file: File,
    volume: number,
    audio: HTMLAudioElement,
    stopped: boolean
}

export default function PlayerPageClient() {
    const [uploadError, setUploadError] = useState<string>("");
    const [audios, setAudios] = useState<AudioData[]>([]);
    
    const [fadeSpeed, setFadeSpeed] = useState(0.01);
    const [globalVolume, setGlobalVolume] = useState(1);
    
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
            volume: 0,
            stopped: false
        }

        setAudios(prev => [...prev, data]);
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
                }
    
                audio.volume = lerp(audio.volume, vol, fadeSpeed * 0.1 * delta);
                audio.audio.volume = clamp(audio.volume * globalVolume, 0, 1);
    
                if(audio != currentAudio && audio.volume <= 0.02) {
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

    }, [currentAudio]);

    useEffect(() => {
        window.addEventListener("dragenter", (e) => {
            e.preventDefault();
        });

        window.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        window.addEventListener("drop", (e) => {
            e.preventDefault();

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

    return (<>
        <div id="audios">{audios.length != 0 ? audios.map((audio, i) => 
            <AudioEntry 
                data={audio} 
                currentAudio={currentAudio}
                setAudios={setAudios} 
                setCurrentAudio={setCurrentAudio}
                key={`audio-${i}-${audio.file.size}`} />)
            
            : <p className="faded">No audios yet...</p>}</div>

        <div id="upload-container">
            <div id="upload-error">{uploadError}</div>

            <div>Add audio by dragging and dropping files or using <input onChange={filesSelected} type="file" accept="audio/*" /></div>
            <div className="faded">No stable internet required. Everything is handled locally in your browser.</div>
        </div>

        <div id="panel">
            <div id="controls">
                <ImageButton label="Pause all" img="/assets/media/img/icons/google/pause.svg" />
                <ImageButton label="Stop all" img="/assets/media/img/icons/google/stop.svg" />
            </div>
        </div>
    </>);
}

function AudioEntry(props: {
        data: AudioData, 
        currentAudio: AudioData | null,
        setAudios: Dispatch<SetStateAction<AudioData[]>>, 
        setCurrentAudio: Dispatch<SetStateAction<AudioData | null>>
    }) {

    const data = props.data;
    const audio = data.audio;
    
    const isCurrent = props.currentAudio == data;

    function remove() {
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
        if(!isCurrent) {
            return;
        }

        props.data.stopped = true;
        props.setCurrentAudio(null);
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
