
export type ElmBase = {
    id?: string,
    className?: string
}

export type TimeUnit = "years" | "months" | "weeks" | "days" | "hours" | "minutes" | "seconds"

export type SplitTime = Record<TimeUnit, number>

const TIME_DIVISORS: {unit: TimeUnit, div: number}[] = [
    {unit: "years", div:  60 * 60 * 24 * 365},
    {unit: "months", div: 60 * 60 * 24 * 30},
    {unit: "weeks", div: 60 * 60 * 24 * 7},
    {unit: "days", div: 60 * 60 * 24},
    {unit: "hours", div: 60 * 60},
    {unit: "minutes", div: 60},
    {unit: "seconds", div: 1 }
];

export function splitSeconds(time: number): SplitTime {
    const res = {
        seconds: 0,
        minutes: 0,
        hours: 0,
        days: 0,
        weeks: 0,
        months: 0,
        years: 0
    };

    for(const divEntry of TIME_DIVISORS) {
        const value = Math.floor(time / divEntry.div);
        time %= divEntry.div;

        res[divEntry.unit] = value;
    }

    return res;
}

// TODO: Add configuration to add more units (like hours)
export function secondsToString(time: number): string {
    const split = splitSeconds(time);

    return `${pad(split.minutes)}:${pad(split.seconds)}`;
}

export function getObjectURLBase64(obj: File): Promise<string> {
    return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.readAsDataURL(obj);

        reader.onload = () => {
            res(reader.result as string);
        }

        reader.onerror = rej;
    });
}

/** 
 * Checks if a specified element is the same or is inside as the specified root.
 * Useful in DOM event handlers.
*/
export function isHas(check: HTMLElement | EventTarget | null, root: HTMLElement): boolean {
    if(!check) {
        return false;
    }

    const chk = (check as HTMLElement);
    
    return chk == root || root.contains(chk);
}

export function pad(number: number, zeros?: number): string {
    return number.toString().padStart(zeros ?? 2, "0");
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

export function classJoin(base: string, extra?: string): string {
    return `${base} ${extra ? extra : ""}`.trimEnd();
}

export function removeExtension(fileName: string): string {
    const split = fileName.split(".");
    
    if(split.length > 1) {
        split.pop();
    }

    return split.join(".");
}

export function clamp(num: number, min: number, max: number): number {
    if(num < min) return min;
    if(num > max) return max;

    return num;
}

export function lerp(from: number, to: number, speed: number): number {
    return from + (to - from) * speed;
}

export function randf(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export function randi(min: number, max: number): number {
    return Math.round(randf(min, max));
}

export function capitalize(text: string): string {
    if(text.length == 0) {
        return text;
    }

    const split = text.split("");

    split[0] = split[0].toUpperCase();
    return split.join("");
}