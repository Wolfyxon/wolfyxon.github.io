import Page from "@/layouts/Page";

import "./style.css";
import "@/css/animations.css";
import { Metadata } from "next";
import ArtPageClient from "./client";

export const metadata: Metadata = {
    title: "Art gallery",
    description: "A page where you can see my silly drawings. I'm new to art so please be nice!"
};

export default function ArtPage() {
    return (
        <Page category="Art">
            <div id="drawings-header" className="observing anim-obs-down">
                <img
                    src="/assets/img/art/crayon.webp"
                    alt="logo"
                />
                <div>
                    <h1>Welcome to my art gallery!</h1>
                    <p>
                        I'm a noob so please be nice!
                    </p>
                    <p>
                        All digital drawings are made by me in Krita using a graphic tablet. <br />
                        Pixel art is made in Libresprite, mostly using a mouse.
                    </p>
                    <p>
                        <b>Note:</b> I do not consent to the use of my work in AI model training. <a href="/docs/licensing/art">License details</a>
                    </p>
                </div>
            </div>

            <ArtPageClient />
        </Page>
    );
}