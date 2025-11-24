import Page from "@/layouts/Page";
import Drawing, { DrawingData } from "./Drawing";

import "./style.css";
import "@/css/animations.css";

const drawings: DrawingData[] = [
    {
        title: "Passage",
        date: "2025-11-23",
        src: "/assets/img/art/Passage.png"
    },
    {
        title: "Angel of Cyphers",
        date: "2025-11-21",
        src: "/assets/img/art/Angel_of_Cyphers.png"
    },
    {
        title: "Forest Witch",
        date: "2025-07-11",
        src: "/assets/img/art/Forest_Witch.png"
    },
    {
        title: "Arctic Fox",
        date: "2025-04-21",
        src: "/assets/img/art/Arctic_Fox.webp"
    },
    {
        title: "Hungarian Parliament",
        date: "2024-09-24",
        src: "/assets/img/art/Hungarian_Parliament.webp"
    }
];

export default function ArtPage() {
    return (
        <Page category="Art">
            <div id="drawings-header">
                {/* TODO: Replace with a short cartoon-ish red pencil drawing */}
                <img
                    src="/assets/img/Wolfyxon.webp"
                    alt="logo"
                />
                <div>
                    <h1>Welcome to my art gallery!</h1>
                    <p>
                        I'm a noob so please be nice! <br/>
                        All digital drawings are made by me in Krita using a graphic tablet.
                    </p>
                    <p>
                        <b>Note:</b> I do not consent my work to be used in the training of AI models.
                    </p>
                </div>
            </div>

            <div id="drawings" className="observing anim-obs-fade">
                {
                    drawings.map((v, i) => <Drawing data={v} key={`drawing-${i}`} />)
                }
            </div>
        </Page>
    );
}