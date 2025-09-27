import { ReactElement } from "react";
import Project from "./Project";

function ProjectList() {
    const elms: ReactElement[] = [];

    function registerProject(name: string, description: string, thumbnail: string, links: {text: string, url: string}[]) {
        const linkElms: ReactElement[] = [];
        
        links.forEach((link) => {
            linkElms.push((
                <a href={link.url} key={name + link.text}>
                    {link.text}
                </a>
            ))
        });
        
        elms.push((
            <Project title={name} description={description} thumbnail={thumbnail} key={name}>
                {linkElms}
            </Project>)
        );
    }

    registerProject(
        "Lover",
        "Command line build system for LÖVE2D.",
        "assets/media/img/home/projectThumbnails/lover.webp",
        [
            {
                text: "Source code",
                url: "https://github.com/Wolfyxon/lover"
            },
            {
                text: "Wiki",
                url: "https://github.com/Wolfyxon/lover/wiki"
            },
            {
                text: "Downloads",
                url: "https://github.com/Wolfyxon/lover/releases/latest"
            }
        ]
    );

    registerProject(
        "Turret Siege",
        "A game where you are being attacked from all sides. Soundtrack made by me.",
        "assets/media/img/home/projectThumbnails/ts.webp",
        [
            {
                text: "Source code",
                url: "https://github.com/Wolfyxon/TurretSiege/"
            },
            {
                text: "Downloads",
                url: "https://github.com/Wolfyxon/TurretSiege/releases/latest"
            }
        ]
    );

    registerProject(
        "3DS Web stuff",
        "A collection of browser games and tools made for the Nintendo 3DS browser with some DSi support.",
        "assets/media/img/home/projectThumbnails/3dsWebStuff.webp",
        [
            {
                text: "Visit the site",
                url: "https://wolfyxon.github.io/3ds-web-stuff"
            },
            {
                text: "Source code",
                url: "https://github.com/Wolfyxon/3ds-web-stuff"
            }
        ]
    );

    registerProject(
        "Godot Together",
        "Experimental Godot plugin for real time collaboration over the network.",
        "assets/media/img/home/projectThumbnails/gdt.webp",
        [
            {
                text: "Source code",
                url: "https://github.com/Wolfyxon/GodotTogether"
            },
            {
                text: "Wiki",
                url: "https://github.com/Wolfyxon/GodotTogether/wiki"
            }
        ]
    );

    registerProject(
        "The Great Doors of Door", 
        "A funny Roblox game that was supposed to be a low-effort parody, but then we made it into an emotional story.", 
        "assets/media/img/home/projectThumbnails/tgdod.webp", 
        [{
            text: "Play on Roblox", 
            url: "https://www.roblox.com/games/10748929809/The-Great-Doors-of-Door-AAAA"
        }]
    );

    registerProject(
        "Hero of the Earth",
        "Discontinued post apocalyptic story game.",
        "assets/media/img/home/projectThumbnails/hote.webp",
        [
            {
                text: "Itch.io page",
                url: "https://wolfyxon.itch.io/hote"
            },
            {
                text: "Downloads",
                url: "https://wolfyxon.itch.io/hote#download"
            }
        ]
    );
    
    return (
        <div id="project-list">{elms}</div>
    );
}

export default ProjectList