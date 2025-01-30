import Redirect from "@/components/Redirect";
import { Metadata } from "next";

import "./css/404.css";

export const metadata: Metadata = {
    title: "Page not found",
    description: "This page does not exist I guess"
}

export default function NotFound() {
    return (
        <>
            <h1>404</h1>
            <p>Page not found, prepare thyself</p>

            <Redirect url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
        </>
    )
}