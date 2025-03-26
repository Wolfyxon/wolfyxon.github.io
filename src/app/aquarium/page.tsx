import AquariumClient from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Aquarium",
    description: "fish."
}

export default function Aquarium() {
    return <AquariumClient />
}