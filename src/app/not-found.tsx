import RedirectPage from "@/layouts/RedirectPage";
import { Metadata } from "next";

import "@/css/main.css";
import "@/css/404.css";

export const metadata: Metadata = {
    title: "Page not found",
    description: "This page does not exist I guess"
}

export default function NotFound() {
    return (
        <RedirectPage url="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
            <h1>404</h1>
            <p>Page not found, prepare thyself</p>
        </RedirectPage>
    )
}