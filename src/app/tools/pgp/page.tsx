import Page from "@/layouts/Page";
import * as fs from "node:fs";
import PGPPageClient from "./client";

import "./style.css";
import "@/css/pageInset.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "PGP encryption",
    description: "Encrypt a message using a public key in the PGP format."
}

const MY_KEY = fs.readFileSync("public/resources/publicKeys/wolfyxon.txt").toString("utf-8");

export default function PGPPage() {
    return (
        <Page category="Encryption">
            <PGPPageClient myKey={MY_KEY} />
        </Page>
    );
}