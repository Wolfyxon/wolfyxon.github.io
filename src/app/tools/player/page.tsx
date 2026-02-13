import { Metadata } from "next";
import Page from "@/layouts/Page";
import PlayerPageClient from "./client";

import "./style.css";
import "@/css/pageInset.css";

export const metadata: Metadata = {
    title: "Player",
    description: "An event handling tool with slideshow functionality and better audio handling."
}

export default function PlayerPage() {
    return (
        <Page category="Player">
            <h1>Player</h1>
            <p>{metadata.description} Made for my school.</p>

            <PlayerPageClient />
        </Page>
    );
}
