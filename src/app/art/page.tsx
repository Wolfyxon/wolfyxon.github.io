import Page from "@/layouts/Page";
import Drawing, { DrawingData } from "./Drawing";

import "./style.css";
import "@/css/animations.css";

const drawings: DrawingData[] = [
    {
        title: "Maxwell",
        date: "2025-11-24",
        src: "/assets/img/maxwell.jpg"
    },
    {
        title: "Edward of Games",
        date: "2025-11-24",
        src: "/assets/img/ose/gierek.jpg"
    },
    {
        title: "Maxwell",
        date: "2025-11-24",
        src: "/assets/img/maxwell.jpg"
    },
    {
        title: "Edward of Games",
        date: "2025-11-24",
        src: "/assets/img/ose/gierek.jpg"
    },
    {
        title: "Maxwell",
        date: "2025-11-24",
        src: "/assets/img/maxwell.jpg"
    },
    {
        title: "Maxwell",
        date: "2025-11-24",
        src: "/assets/img/maxwell.jpg"
    }
];

export default function ArtPage() {
    return (
        <Page category="Art">
            <div id="drawings-header">
                {/* TODO: Make a  */}
                <img
                    src="/assets/img/Wolfyxon.webp"
                    alt="logo"
                />
                <div>
                    <h1>Welcome to my art gallery!</h1>
                    <p>
                        I'm a noob so please be nice! <br/>
                        All drawings are made by me in Krita using a graphic tablet.
                    </p>
                    <p>
                        <b>Note:</b> I do not consent my work to be used in the training of AI models.
                    </p>
                    <p>(also page under construction, you will see mostly placeholders)</p>
                </div>
            </div>

            <div id="drawings">
                {
                    drawings.map((v, i) => <Drawing data={v} key={`drawing-${i}`} />)
                }
            </div>
        </Page>
    );
}