import Page from "@/layouts/Page";

import SlideShowPageClient from "./client";

import "@/css/pageInset.css";
import "./style.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Slideshow",
    description: "Online slideshow tool"
}

export default function SlideShowPage() {
    return (
        <Page category="Slideshow">
            <h1>Slideshow player</h1>
            <SlideShowPageClient />

            <h2>How to use?</h2>
            <ol>
                <li>Open this page in 2 tabs</li>
                <li>Move one tab to a separate window and put it on the projector screen</li>
                <li>Add slide images</li>
                <li>Click 'fullscreen' on the projector tab</li>
                <li>Use 'previous' and 'next' buttons to swap between slides</li>
            </ol>
            <p>
                Also see <a href="/tools/player" target="_blank">Player</a> to control music and slides at the same time.
            </p>
        </Page>
    );
}