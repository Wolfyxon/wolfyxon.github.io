export function base64encode(buf: Uint8Array): string {
    let bin = "";

    for (const byte of buf) {
        bin += String.fromCharCode(byte);
    }

    return btoa(bin);
}

export function base64decode(base64: string): Uint8Array {
    const bin = atob(base64);
    return Uint8Array.from(bin, c => c.charCodeAt(0));
}

export function removeEmpty(strings: string[]): string[] {
    const res = [];

    for(const str of strings) {
        if(str.trim().length != 0) {
            res.push(str);
        }
    }

    return res;
}

export function removeExtension(fileName: string): string {
    const split = fileName.split(".");
    
    if(split.length > 1) {
        split.pop();
    }

    return split.join(".");
}

export function capitalize(text: string): string {
    if(text.length == 0) {
        return text;
    }

    const split = text.split("");

    split[0] = split[0].toUpperCase();
    return split.join("");
}

export function toKebabCase(text: string) {
    return text.trim().toLowerCase()
        .replaceAll(",", "")
        .replaceAll("'", "")
        .replaceAll("\"", "")
        .replaceAll(".", "")
        .replaceAll(" ", "-");
}
