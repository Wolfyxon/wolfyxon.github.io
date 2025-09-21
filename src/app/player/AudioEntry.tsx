import { Dispatch, SetStateAction } from "react";
import { AudioData } from "./client";
import ImageButton from "@/components/input/ImageButton/ImageButton";
import { removeExtension } from "@/utils";

import "./AudioEntry.css";

export default function AudioEntry(props: {
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
