import Page from "@/layouts/Page";
import { Metadata } from "next";
import PlayerPageClient from "./client";

import "./style.css";

export const metadata: Metadata = {
    title: "Player",
    description: "Smooth audio player thing"
}

export default function PlayerPage() {
    return (
        <Page category="Player">
            <h1>Player</h1>
            <p>A fading audio player I made to better handle music at school ceremonies.</p>

            <PlayerPageClient />
        </Page>
    );
}
