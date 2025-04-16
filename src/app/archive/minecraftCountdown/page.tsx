import { Metadata } from "next";
import MinecraftMovieCountdownClient from "./client";

export const metadata: Metadata = {
    title: "COUNTDOWN",
    description: "...to A Minecraft Movie"
}

export default function MinecraftMovieCountdown() {
    return (
        <>
            <MinecraftMovieCountdownClient />
        </>
    )
}