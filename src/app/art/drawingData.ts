
export type DrawingData = {
    title: string,
    date: string,
    src: string,
    note?: string,
    hideFromBots?: boolean
};

export const DRAWINGS: DrawingData[] = [
    {
        title: "Little Wolf",
        date: "2025-12-29",
        src: "/assets/img/art/littleWolf.webp"
    },
    {
        title: "What to draw...",
        date: "2025-12-03",
        src: "/assets/img/art/What_to_draw.webp",
        note: "Imagine being so low on ideas you make a drawing about it"
    },
    {
        title: "Fight the Void",
        date: "2025-11-25",
        src: "/assets/img/art/Fight_the_Void.webp"
    },
    {
        title: "Passage",
        date: "2025-11-23",
        src: "/assets/img/art/Passage.webp",
        note: "Yeah I reused the pose from Angel of Cyphers"
    },
    {
        title: "Angel of Cyphers",
        date: "2025-11-21",
        src: "/assets/img/art/Angel_of_Cyphers.webp"
    },
    {
        title: "Forest Witch",
        date: "2025-07-11",
        src: "/assets/img/art/Forest_Witch.webp",
        note: "I don't really like but don't hate it either. Yes I messed up that arm.",
        hideFromBots: true
    },
    {
        title: "Arctic Fox",
        date: "2025-04-21",
        src: "/assets/img/art/Arctic_Fox.webp",
        note: ":3"
    },
    {
        title: "Hungarian Parliament",
        date: "2024-09-24",
        src: "/assets/img/art/Hungarian_Parliament.webp",
        note: "Drew this in school for a project."
    },
    {
        title: "3DS Web Stuff Pigeon sprites",
        date: "2024-03-19",
        src: "/assets/img/art/3DSWebStuff-Pigeon.webp",
        note: "Sprites for a Flappy Bird clone on my 3DS browser games site."
    }
];
