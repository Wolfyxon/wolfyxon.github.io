import { ReactElement } from "react";
import Project from "./Project";

function ProjectList() {
    const elms: ReactElement[] = [];

    function registerProject(name: string, description: string, thumbnail: string, links: {text: string, url: string}[]) {
        const linkElms: ReactElement[] = [];
        
        links.forEach((link) => {
            linkElms.push((
                <a href={link.url}>
                    {link.text}
                </a>
            ))
        });
        
        elms.push((
            <Project title={name} description={description} thumbnail={thumbnail}>
                {linkElms}
            </Project>)
        );
    }

    registerProject(
        "The Great Doors of Door", 
        "A game that was supposed to be a parody of DOORS, but we accidentally made a lore and it became something entirely different. Made by me, Karoleus.PL and rob eeee.", 
        "assets/media/img/home/projectThumbnails/tgdod.webp", 
        [{
            text: "Play on Roblox", 
            url: "https://www.roblox.com/games/10748929809/The-Great-Doors-of-Door-AAAA"
        }]
    );

    registerProject(
        "Turret Siege",
        "A game in early development where you are a turret surrounded by bullets and enemies.",
        "assets/media/img/home/projectThumbnails/ts.png",
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
        "A collection of browser games and tools made for the Nintendo 3DS browser.",
        "assets/media/img/home/projectThumbnails/3dsWebStuff.png",
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
        "Lover",
        "Command line build system for LÖVE2D.",
        "assets/media/img/home/projectThumbnails/lover.png",
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
        "MinVideo",
        "Easy to understand and implement uncompressed video format for limited environments.",
        "assets/media/img/home/projectThumbnails/MinVideo.png",
        [
            {
                text: "Source code",
                url: "https://github.com/Wolfyxon/MinVideo"
            },
            {
                text: "Web player",
                url: "https://wolfyxon.github.io/MinVideo/js/test"
            }
        ]
    );

    registerProject(
        "Hero of the Earth",
        "Discontinued post apocalyptic story game.",
        "assets/media/img/home/projectThumbnails/hote.png",
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
    )

    registerProject(
        "This site",
        "I think it deserves to be listed here since I put quite a lot of effort into it :]",
        "assets/media/img/Wolfyxon.png",
        [
            {
                text: "Source code",
                url: "https://github.com/Wolfyxon/wolfyxon.github.io"
            },
            {
                text: "Useless button",
                url: ""
            }
        ]
    );


    return (
        <div id="project-list">{elms}</div>
    );
}

export default ProjectList