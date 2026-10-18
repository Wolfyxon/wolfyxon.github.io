"use client"

import Page from "@/layouts/Page"
import { useRef } from "react";

import "@/css/pageInset.css";
import "./style.css";
import { cryptoUtil } from "@/util/crypto";


export default function EncryptionPage() {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const outputRef = useRef<HTMLTextAreaElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function getKey() {
        const enc = new TextEncoder();

        const keyMaterial = await window.crypto.subtle.importKey(
            "raw",
            enc.encode(passwordRef.current!.value),
            { name: "PBKDF2" },
            false,
            ["deriveKey"]
        );

        return window.crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: new ArrayBuffer(),
            iterations: 100000,
            hash: "SHA-256",
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
        );
    }

    async function encrypt() {
        const key = await getKey();
        const res = await cryptoUtil.encryptString(key, inputRef.current!.value);

        outputRef.current!.value = res;
    }

    async function decrypt() {
        const key = await getKey();
        const res = await cryptoUtil.decryptString(key, inputRef.current!.value);

        if(res) {
            outputRef.current!.value = res;
        } else {
            outputRef.current!.value = "Decryption failed";
        }
    }
    
    return (
        <Page category="Tools" homeUrl="/tools" sub="Encryption">
            <div id="encryption-page-main">
                <h1>Encrypt or decrypt data</h1>

                <h2>Input</h2>
                <textarea ref={inputRef} placeholder="Enter data here..."></textarea>
                <input type="password" ref={passwordRef} placeholder="Enter password..."/>

                <div className="buttons">
                    <button onClick={encrypt}>Encrypt</button>
                    <button onClick={decrypt}>Decrypt</button>
                </div>

                <h2>Output</h2>

                <textarea disabled ref={outputRef} placeholder="Encrypted or decrypted text will appear here..."/>
            </div>
        </Page>
    )
}