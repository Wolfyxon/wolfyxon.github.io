import { base64decode, base64encode } from "./string";

export namespace cryptoUtil {
    const DEFAULT_ALG = "AES-GCM";
    const DEFAULT_SALT = "helotheremyfred";
    const DEFAULT_KEY_LEN = 256;
    const DEFAULT_KEY_ITERATIONS = 100000;

    export async function keyFromPassword(password: string): Promise<CryptoKey> {
        const enc = new TextEncoder();

        const keyMaterial = await crypto.subtle.importKey(
            "raw",
            enc.encode(password),
            { name: "PBKDF2" },
            false,
            ["deriveKey"]
        );

        return crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                salt: enc.encode(DEFAULT_SALT),
                iterations: DEFAULT_KEY_ITERATIONS,
                hash: "SHA-256",
            },
            keyMaterial,
            { name: DEFAULT_ALG, length: DEFAULT_KEY_LEN },
            false,
            ["encrypt", "decrypt"]
        );
    }

    export async function encryptChunk(key: CryptoKey, data: Uint8Array<ArrayBuffer>): Promise<Uint8Array<ArrayBuffer>> {
        const iv = crypto.getRandomValues(new Uint8Array(12));

        const buf = await crypto.subtle.encrypt(
            { name: DEFAULT_ALG, iv: iv },
            key,
            data
        );

        const res = new Uint8Array(iv.length + buf.byteLength);
        res.set(iv, 0);
        res.set(new Uint8Array(buf), iv.length);

        return res;
    }

    export async function decryptChunk(key: CryptoKey, chunk: Uint8Array): Promise<Uint8Array<ArrayBuffer> | undefined> {
        try {
            const iv = chunk.slice(0, 12);
            const encryptedData = chunk.slice(iv.length);

            const decryptedBuf = await crypto.subtle.decrypt(
                { name: DEFAULT_ALG, iv: iv},
                key,
                encryptedData
            );

            return new Uint8Array(decryptedBuf);
        } catch {
            return;
        }
    }

    export async function encryptString(key: CryptoKey, text: string): Promise<string> {
        const buf = await encryptChunk(key, new TextEncoder().encode(text));
        
        return base64encode(buf);
    }

    export async function decryptString(key: CryptoKey, base64text: string): Promise<string | undefined> {
        try {
            const buf = base64decode(base64text);
            const decryptedBuf = await decryptChunk(key, buf);

            if(!decryptedBuf) {
                return;
            }

            return new TextDecoder().decode(decryptedBuf);
        } catch {
            return;
        }
    }
}
