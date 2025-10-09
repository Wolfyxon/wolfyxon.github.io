"use client";

import { clamp, lerp } from "@/utils";
import { ReactNode, RefObject, useEffect, useState } from "react";
import FileUpload, { UPLOAD_NOTE_OFFLINE } from "@/components/FileUpload/FileUpload";
import Checkbox from "@/components/input/Checkbox/Checkbox";
import HeaderSwitch from "./HeaderSwitch";
import LeaveBlocker from "@/components/func/LeaveBlocker";
import Slider from "@/components/input/Slider/Slider";
import HSeparator from "@/components/separators/HSeparator";
import AudioEntry from "./AudioEntry/AudioEntry";
import SlideShowControls from "../slideshow/controls/SlideShowControls";

export type AudioData = {
    elm?: ReactNode,
    ref?: RefObject<null>,
    file: File,
    targetVolume: number,
    audio: HTMLAudioElement,
    stopped: boolean
}

export default function PlayerPageClient() {
    const [audios, setAudios] = useState<AudioData[]>([]);
    
    const [fadeSpeed, setFadeSpeed] = useState(0.01);
    const [globalVolume, setGlobalVolume] = useState(100);

    const [askBeforeLeaving, setAskBeforeLeaving] = useState(true);
    const [askBeforeDeleting, setAskBeforeDeleting] = useState(false);
    
    const [currentAudio, setCurrentAudio] = useState<AudioData | null>(null);

    function addAudio(file: File) {
        if(!(file.type === "application/ogg" || file.type.startsWith("audio/"))) {
            return `${file.name} is not an audio file: ${file.type}`;
        }

        const data: AudioData = {
            audio: new Audio(URL.createObjectURL(file)),
            file: file,
            targetVolume: 0,
            stopped: false
        }

        setAudios(prev => [...prev, data]);
    }
    
    function filesDropped(files: FileList): string[] {
        const errs: string[] = [];

        for(const f of files) {
            const err = addAudio(f);

            if(err) {
                errs.push(err);
            }
        }

        return errs;
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

    const [fileUploadDisabled, setFileUploadDisabled] = useState(false);
    const [slideshowEnabled, setSlideshowEnabled] = useState(false);
    const [lockChecks, setLockChecks] = useState(false);
    const [lockSliders, setLockSliders] = useState(false);
    const [lockDel, setLockDel] = useState(false);
    const [lockTime, setLockTime] = useState(false);

    return (<>

        <div id="top-panels">
            <div id="audio-panel">
                <div id="audios">{audios.length != 0 ? audios.map((audio, i) => 
                    <AudioEntry 
                        data={audio} 
                        currentAudio={currentAudio}
                        setAudios={setAudios} 
                        setCurrentAudio={setCurrentAudio}
                        askBeforeDeleting={askBeforeDeleting}
                        lockDelete={lockDel}
                        lockTime={lockTime}
                        key={`audio-${i}-${audio.file.size}`} />)
                    
                    : <p className="faded">No audios yet...</p>}
                </div>

                {!fileUploadDisabled ? 
                    <FileUpload 
                        accept="audio/*" 
                        callback={filesDropped}
                        prefix="Add audio by dragging and dropping files or"
                        note={UPLOAD_NOTE_OFFLINE}
                    />
                : null
                }


            </div>
            
            {
                slideshowEnabled ?
                    <SlideShowControls
                        setSrc={() => {}}
                        hideUpload={fileUploadDisabled} 
                    />
                : null
            }
        </div>

        <div id="panel">
            <div id="settings">
                <div id="switches">
                    <Checkbox label="Lock" flat checked={lockChecks} onChange={setLockChecks} />
                    <HSeparator />

                    <HeaderSwitch disabled={lockChecks} />
                    <Checkbox label="Hide file uploads" checked={fileUploadDisabled} onChange={setFileUploadDisabled} disabled={lockChecks} />
                    <Checkbox label="Lock audio deletion" checked={lockDel} onChange={setLockDel} disabled={lockChecks} />
                    <Checkbox label="Lock audio time" checked={lockTime} onChange={setLockTime} disabled={lockChecks} />

                    <Checkbox label="Ask before leaving" checked={askBeforeLeaving} onChange={setAskBeforeLeaving} disabled={lockChecks} />
                    <Checkbox label="Ask before deleting audio" checked={askBeforeDeleting} onChange={setAskBeforeDeleting} disabled={lockChecks} />
                    
                    <Checkbox 
                        label="Enable slideshow control"
                        checked={slideshowEnabled}
                        onChange={setSlideshowEnabled}
                    />
                </div>
                <div id="ranges">
                    <Checkbox label="Lock" flat checked={lockSliders} onChange={setLockSliders} />
                    <HSeparator />

                    <Slider label="Global volume" onChange={setGlobalVolume} value={globalVolume} disabled={lockSliders} />
                    <Slider label="Fade speed" onChange={setFadeSpeed} value={fadeSpeed} min={0.0001} max={0.5} step={0.0001} disabled={lockSliders} />
                </div>
            </div>
        </div>
       
        <LeaveBlocker enabled={audios.length != 0 && askBeforeLeaving} />
    </>);
}
