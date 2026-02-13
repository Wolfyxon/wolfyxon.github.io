 "use client";

import Accordion from "@/components/input/Accordion/Accordion";
import ImageButton from "@/components/input/ImageButton/ImageButton";
import { useState } from "react";

type ReceipentData = {
    key: string,
    name?: string
}

function Receipent(props: {data: ReceipentData}) {
    return (
        <Accordion title={props.data.name ?? "..."}>
            <textarea placeholder="Enter a puiblic key block..." defaultValue={props.data.key} />
        </Accordion>
    )
}

export default function EncryptionPageClient(props: {myKey: string}) {
    const [receipents, setReceipents] = useState<ReceipentData[]>([
        {
            key: props.myKey,
            name: "Wolfyxon"
        }
    ]);

    return (<>
        <h1>Encrypt a message using OpenPGP</h1>
        <div id="sides">
            <div id="side-message">
                <h2>Encryption</h2>
                
                <label htmlFor="area-text">Your message</label>
                <textarea id="area-message" placeholder="Type your message to encrypt..."></textarea>

                <ImageButton img="/assets/img/icons/google/check.svg" label="Encrypt" />
            </div>
            <div id="side-receipents">
                <h2>Settings</h2>
                <label>Receipents</label>
                
                {
                    receipents.map((r, i) => <Receipent data={r} key={`rec-${i}`} /> )
                }
            </div>
        </div>
    </>);
}