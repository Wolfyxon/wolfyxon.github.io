import { Metadata } from "next";
import PlutoniumPageClient from "./client";

export const metadata: Metadata = {
    title: "Nuclear lab",
    description: "Watch a ball of plutonium-239 decay into uranium-235"
};

export default function PlutoniumPage() {
   return <PlutoniumPageClient/>    
}
