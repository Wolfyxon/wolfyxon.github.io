import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { AudioData } from "../client";
import ImageButton from "@/components/input/ImageButton/ImageButton";
import { removeExtension } from "@/utils";

import "./style.css";
import Slider from "@/components/input/Slider/Slider";

export default function AudioEntry(props: {
    data: AudioData, 
    currentAudio: AudioData | null,
    setAudios: Dispatch<SetStateAction<AudioData[]>>, 
    setCurrentAudio: Dispatch<SetStateAction<AudioData | null>>,
    askBeforeDeleting?: boolean,
    lockDelete?: boolean,
    lockTime?: boolean
}) {
    const data = props.data;
    const audio = data.audio;

    const isCurrent = props.currentAudio == data;
    const sliderInputRef = useRef<HTMLInputElement>(null);

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

    function seek(time: number) {
        audio.currentTime = time;
    }

    useEffect(() => {
        let frame: number;

        const loop = () => {
            if(!isNaN(audio.duration)) {
                sliderInputRef.current!.value = audio.currentTime.toString();
            }
            
            frame = requestAnimationFrame(loop);
        }

        frame = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(frame);
    }, []);

    const name = removeExtension(props.data.file.name);

    return (
        <div className={`audio ${isCurrent ? "current" : ""}`}>
            <div className="audio-col1">
                <input type="text" defaultValue={name} placeholder={name} className="audio-title" aria-label="Audio title" />
                
                <Slider
                    step={0.01}
                    max={audio.duration} 
                    className="audio-time-range" 
                    ariaLabel="Time position" 
                    disabled={props.lockTime}
                    onChange={seek}
                    inputRef={sliderInputRef}
                    flat
                />
            </div>

            <div className="audio-col2">
                <div className="audio-controls">
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
                    
                    <ImageButton label="Stop" img="/assets/media/img/icons/google/stop.svg" onClick={stop} />
                    <ImageButton label="Delete" img="/assets/media/img/icons/google/delete.svg" onClick={remove} disabled={props.lockDelete} />
                </div>
                <div className="audio-time">0:00 / 0:00</div>
            </div>
        </div>
    );
}
