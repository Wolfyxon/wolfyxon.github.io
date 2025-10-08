import Page from "@/layouts/Page";

import SlideShowPageClient from "./client";

import "@/css/pageInset.css";
import "./style.css";

export default function SlideShowPage() {
    return (
        <Page category="Slideshow">
            <h1>Slideshow player</h1>
            <SlideShowPageClient />
        </Page>
    );
}