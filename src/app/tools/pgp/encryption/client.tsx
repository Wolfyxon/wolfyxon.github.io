 "use client";

import Accordion from "@/components/input/Accordion/Accordion";
import ImageButton from "@/components/input/ImageButton/ImageButton";
import { useState } from "react";
import * as openpgp from "openpgp";

type KeyData = {
    key: string,
    name?: string
}

function Key(props: {data: KeyData}) {
    return (
        <Accordion title={props.data.name ?? "..."}>
            <textarea placeholder="Enter a puiblic key block..." defaultValue={props.data.key} />
        </Accordion>
    )
}

export default function EncryptionPageClient(props: {myKey: string}) {
    const [message, setMessage] = useState("");
    const [encryptedText, setEncryptedText] = useState("");
    const [outdated, setOutdated] = useState(false);

    const [keys, setKeys] = useState<KeyData[]>([
        {
            key: props.myKey,
            name: "Wolfyxon"
        }
    ]);

    async function encrypt() {
        let keyText = "";

        for(const k of keys) {
            keyText += k.key;
        }

        const key = await openpgp.readKey({ armoredKey: keyText });
        const msg = await openpgp.createMessage({ text: message });

        const encrypted = await openpgp.encrypt({
            message: msg,
            encryptionKeys: key
        });

        setOutdated(false);
        setEncryptedText(encrypted);
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(encryptedText);
    }

    return (<>
        <h1>Encrypt a message using OpenPGP</h1>
        <div id="sides">
            <div id="side-message">
                <h2>Encryption</h2>
                
                <label htmlFor="area-text">Your message</label>
                <textarea 
                    id="area-message" 
                    placeholder="Type your message to encrypt..."
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                        setOutdated(true);
                    }}
                />

                
                <div>
                    <label htmlFor="area-encrypted">Encrypted message</label>
                    {
                        outdated ?
                        <label style={{color: "var(--color2)"}}> (outdated!)</label>
                        : null
                    }
                </div>
                <textarea 
                    id="area-encrypted" 
                    placeholder="No data yet..."
                    value={encryptedText}
                    disabled
                />
                
                <div id="buttons">
                    <ImageButton 
                        img="/assets/img/icons/google/check.svg" 
                        label="Encrypt"
                        onClick={encrypt}
                        disabled={keys.length == 0 || message.length == 0}
                    />
                    <ImageButton 
                        img="/assets/img/icons/google/copy.svg" 
                        label="Copy"
                        onClick={copyToClipboard}
                        disabled={encryptedText.length == 0}
                    />
                </div>

            </div>
            <div id="side-settings">
                <h2>Settings</h2>
                <label>Keys</label>

                {
                    keys.map((r, i) => <Key data={r} key={`rec-${i}`} /> )
                }
            </div>
        </div>
    </>);
}