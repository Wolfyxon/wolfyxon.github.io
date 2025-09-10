"use client";

import ImageButton from "@/components/ImageButton/ImageButton";
import { clamp, lerp } from "@/utils";
import { ChangeEvent, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

type AudioData = {
    elm?: ReactNode,
    file: File,
    volume: number,
    audio: HTMLAudioElement
}

let currentAudio: AudioData | null = null;

export default function PlayerPageClient() {
    const [uploadError, setUploadError] = useState<string>("");
    const [audios, setAudios] = useState<AudioData[]>([]);
    
    const [fadeSpeed, setFadeSpeed] = useState(0.01);
    const [globalVolume, setGlobalVolume] = useState(1);
    
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
        }

        const key = `audio-${file.size}-${Math.floor(Date.now())}`;
        const elm = (<AudioEntry data={data} setAudios={setAudios} key={key} />);

        data.elm = elm;

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
    
    setInterval(() => {
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

            if(audio != currentAudio && audio.volume <= 0.05) {
                audio.audio.pause();
            }
        }
    });

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
        <div id="audios">{audios.length != 0 ? audios.map((audio) => audio.elm) : <p className="faded">No audios yet...</p>}</div>

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

function AudioEntry(props: {data: AudioData, setAudios: Dispatch<SetStateAction<AudioData[]>>}) {
    const audio = props.data.audio;
    
    function remove() {
        props.setAudios((prev) => prev.filter((v) => v != props.data));
    }

    function playPause() {
        if(audio.paused) {
            currentAudio = props.data;
            audio.play();
        } else {
            currentAudio = null;
        }
    }

    return (
        <div className="audio">
            <div className="audio-status"></div>

            <input type="text" defaultValue={props.data.file.name} placeholder="Unnamed" className="audio-title" />
            
            <ImageButton label="Play" img="/assets/media/img/icons/google/play.svg" onClick={playPause} />
            <ImageButton label="Stop" img="/assets/media/img/icons/google/stop.svg" />
            <ImageButton label="Delete" img="/assets/media/img/icons/google/delete.svg" onClick={remove} />
        </div>
    );
}
