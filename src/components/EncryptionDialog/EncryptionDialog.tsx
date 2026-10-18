"use client";

import { SubmitEvent, useEffect, useRef, useState } from "react";

import "@/css/animations.css";
import "./style.css";
import { cryptoUtil } from "@/util/crypto";

export default function EncryptionDialog(props: {
    note?: any, 
    base64buf: string,
    onSuccess: ((data: string) => any | void);
}) {
    const [hasJs, setJs] = useState(false);
    const [status, setStatus] = useState("Waiting...");

    const passwordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setJs(true);
    }, []);

    async function submit(e: SubmitEvent) {
        e.preventDefault();
        
        setStatus("Decrypting...");

        const key = await cryptoUtil.keyFromPassword(passwordRef.current!.value);
        const decrypted = await cryptoUtil.decryptString(key, props.base64buf);

        if(!decrypted) {
            setStatus("Access denied");
            return;
        }

        setStatus("Decryption was successful, but the website had an error");
        props.onSuccess(decrypted);
    }

    return (
        <div className="encryption-dialog-container">
            <form className="encryption-dialog" onSubmit={submit}>
                <img src="/assets/img/icons/google/lock.svg" alt="Lock icon" className="encryption-icon" width="50px" />
                <h1>This page is encrypted</h1>
                <p>And no, it's not a simple password check. The data is literally encrypted. Still client side tho.</p>
                {props.note}
                {
                    hasJs ?
                    <div className="encryption-inputs">
                        <p>{status}</p>
                        <input type="password" ref={passwordRef} className="encryption-input" placeholder="Enter password..."/>
                        <input type="submit" value="Submit"/>
                    </div>
                    : <h2>Please enable JavaScript.</h2>
                }
            </form>
        </div>
    )
}
