"use client";

import ImageButton from "@/components/input/ImageButton/ImageButton";

export default function EncryptionPageClient(props: {myKey: string}) {
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
                <h2>Receipents</h2>
            </div>
        </div>
    </>);
}