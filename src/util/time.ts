
import { pad } from "./math";

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

export const DAYS: string[] = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
];

export const MONTHS: string[] = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
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
