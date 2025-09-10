"use client";

import ImageButton from "@/components/ImageButton/ImageButton";

export default function PlayerPageClient() {
    return (<>
        <div id="audios">
            <AudioEntry title="hi" />
        </div>

        <div id="upload-container">
            <div>Add audio by dragging and dropping files or using <input type="file" /></div>
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

function AudioEntry(props: {title: string}) {
    return (
        <div className="audio">
            <input type="text" defaultValue={props.title} placeholder="Unnamed" className="audio-title" />
            
            <ImageButton label="Play" img="/assets/media/img/icons/google/play.svg" />
            <ImageButton label="Stop" img="/assets/media/img/icons/google/stop.svg" />
            <ImageButton img="/assets/media/img/icons/google/delete.svg" />
        </div>
    );
}
