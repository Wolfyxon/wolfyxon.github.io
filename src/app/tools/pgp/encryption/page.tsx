import Page from "@/layouts/Page";
import * as fs from "node:fs";
import EncryptionPageClient from "./client";

import "./style.css";
import "@/css/pageInset.css";

const MY_KEY = fs.readFileSync("public/resources/publicKeys/wolfyxon.txt").toString("utf-8");

export default function EncryptionPage() {
    return (
        <Page category="Encryption">
            <EncryptionPageClient myKey={MY_KEY} />
        </Page>
    );
}