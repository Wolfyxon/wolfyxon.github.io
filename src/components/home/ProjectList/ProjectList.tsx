import Project from "../Project/Project";
import "./style.css";

export default function ProjectList() {
    return (
        <div className="project-list">
            <Project 
                title="GodotTogether"
                description="A plugin for Godot Engine that allows for real time collaboration, just like Team Create on Roblox."
                thumbnail="assets/img/home/projectThumbnails/gdt.webp"
                links={{
                    "Project page": "https://github.com/Wolfyxon/GodotTogether"
                }}
            />

            <Project 
                title="TurretSiege"
                description="A game where you are a little turret surrounded by enemies. Survive as long as you can!"
                thumbnail="assets/img/home/projectThumbnails/ts.webp"
                links={{
                    "Project page": "https://github.com/Wolfyxon/TurretSiege"
                }}
            />

            <Project 
                title="3DS Web Stuff"
                description="A website with browser games made specifically for the Nintendo 3DS. No console mods! Just browser games!"
                thumbnail="assets/img/home/projectThumbnails/3dsWebStuff.webp"
                links={{
                    "See the site": "https://wolfyxon.github.io/3ds-web-stuff",
                    "Source code": "https://github.com/Wolfyxon/3ds-web-stuff"
                }}
            />

            <Project 
                title="Lover"
                description="Universal project builder for Love2D games with some extra features."
                thumbnail="assets/img/home/projectThumbnails/lover.webp"
                links={{
                    "Project page": "https://github.com/Wolfyxon/lover"
                }}
            />

            <Project 
                title="Bateria"
                description="Minimal, but powerful and universal battery discharge monitor for Linux, written in C."
                thumbnail="assets/img/home/projectThumbnails/bateria.webp"
                links={{
                    "Project page": "https://github.com/Wolfyxon/bateria"
                }}
            />

            <Project 
                title="Lockguy"
                description="Simple, classical lockscreen for Linux. Written in C."
                thumbnail="assets/img/home/projectThumbnails/lockguy.webp"
                links={{
                    "Project page": "https://github.com/Wolfyxon/lockguy"
                }}
            />

            <Project 
                title="The Great Doors of Door"
                description="A Roblox game that was supposed to be a parody, but instead turned into an emotional story."
                thumbnail="assets/img/home/projectThumbnails/tgdod.webp"
                links={{
                    "Play on Roblox": "https://www.roblox.com/games/10748929809/The-Great-Doors-of-Door-AAAA"
                }}
            />

            <Project 
                title="Hero of the Earth"
                description="A post-apocalyptic sci-fi game."
                thumbnail="assets/img/home/projectThumbnails/hote.webp"
                links={{
                    "itch.io page": "https://wolfyxon.itch.io/hote"
                }}
            />
        </div>
    );
}
