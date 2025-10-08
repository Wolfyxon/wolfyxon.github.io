import { Metadata } from "next";
import Page from "@/layouts/Page";
import PlayerPageClient from "./client";

import "./style.css";
import "@/css/pageInset.css";

export const metadata: Metadata = {
    title: "Player",
    description: "Smooth audio player thing"
}

export default function PlayerPage() {
    return (
        <Page category="Player">
            <h1>Player</h1>
            <p>A fading audio player I made to better handle music at school events so the music isn't just unprofessionally interrupted.</p>

            <PlayerPageClient />
        </Page>
    );
}
