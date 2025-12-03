
import { pad } from "./math";

export type TimeUnit = "years" | "months" | "weeks" | "days" | "hours" | "minutes" | "seconds"
export type SplitTime = Record<TimeUnit, number>

export const MINUTES = 60;
export const HOURS = MINUTES * 60;
export const DAYS = HOURS * 24;
export const WEEKS = DAYS * 7;
export const MONTHS = DAYS * 30;
export const YEARS = MONTHS * 12;

const TIME_DIVISORS: {unit: TimeUnit, div: number}[] = [
    {unit: "years", div:  YEARS},
    {unit: "months", div: MONTHS},
    {unit: "weeks", div: WEEKS},
    {unit: "days", div: DAYS},
    {unit: "hours", div: HOURS},
    {unit: "minutes", div: MINUTES},
    {unit: "seconds", div: 1 }
];

export const DAY_NAMES: string[] = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
];

export const MONTH_NAMES: string[] = [
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

export function getISODate(date?: Date): string {
    date = date ?? new Date();

    return date.toISOString().split('T')[0];
}
