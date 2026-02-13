 "use client";

import Accordion, { AccordionButton } from "@/components/input/Accordion/Accordion";
import ImageButton from "@/components/input/ImageButton/ImageButton";
import { useEffect, useState } from "react";
import * as openpgp from "openpgp";

type KeyData = {
    data: openpgp.Key,
    comment?: string
}

function Key(props: {
    keyData: KeyData, 
    removeKey: (key: KeyData) => any
}) {
    const fingerprint = props.keyData.data.getFingerprint().slice(0, 8);
    const name = `${fingerprint} ${props.keyData.comment ?? ""}`;

    const buttons: AccordionButton[] = [
        {
            name: "Delete",
            icon: "/assets/img/icons/google/delete.svg",
            onClick: () => {
                props.removeKey(props.keyData);
            }
        }
    ]

    return (
        <Accordion title={name} buttons={buttons}>
            <div className="faded">
                The text may be different from your input, but the key should be the same.
            </div>
            <textarea 
                placeholder="Enter a puiblic key block..." 
                defaultValue={props.keyData.data.armor()}
                className="key-area"
                disabled
            />
        </Accordion>
    )
}

export default function EncryptionPageClient(props: {myKey: string}) {
    const [message, setMessage] = useState("");
    const [encryptedText, setEncryptedText] = useState("");
    const [outdated, setOutdated] = useState(false);
    const [keyText, setKeytext] = useState("");
    const [keyAddError, setKeyAddError] = useState("");

    const [keys, setKeys] = useState<KeyData[]>([]);

    useEffect(() => {
        openpgp.readKey({armoredKey: props.myKey}).then((key) => {
            addKey(key, "Wolfyxon");
        });
    }, []);

    async function encrypt() {
        let keyText = "";

        for(const k of keys) {
            keyText += k.data.armor();
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

    function addKey(key: openpgp.Key, comment?: string) {
        setKeys((old) => {
            return [...old, {
                data: key,
                comment: comment
            }]
        });
    }

    function keyExists(fingerprint: string): boolean {
        for(const key of keys) {
            if(key.data.getFingerprint() == fingerprint) {
                return true;
            }
        }

        return false;
    }

    async function addKeyText(keyText: string, comment?: string) {
        try {
            const data = await openpgp.readKey({armoredKey: keyText});

            if(keyExists(data.getFingerprint())) {
                setKeyAddError("This key is already added");
                return;
            }

            addKey(data, comment);
            setKeyAddError("");
        } catch(e) {
            setKeyAddError(`Invalid key: ${e}`);
        }
    }

    async function addKeyFromInput() {
        addKeyText(keyText);
    }

    function removeKey(key: KeyData) {
        setKeys(keys.filter((k) => k != key));
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
                <div>
                    <label>Public keys</label>

                    {
                        keys.map((r, i) => <Key keyData={r} key={`rec-${i}`} removeKey={removeKey} /> )
                    }
                </div>

                <div id="add-key-container">
                    <label htmlFor="area-add-key">Add new key</label>
                    <div style={{color: "var(--color2)"}}>{keyAddError}</div>
                    
                    <textarea 
                        id="area-add-key" 
                        placeholder="Enter a public key block..."
                        className="key-area"
                        onChange={(e) => setKeytext(e.target.value)}
                    />
                    <ImageButton
                        img="/assets/img/icons/google/plus.svg"
                        label="Add public key"
                        onClick={addKeyFromInput}
                    />
                </div>
            </div>
        </div>
    </>);
}