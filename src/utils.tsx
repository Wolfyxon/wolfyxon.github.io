import { ReactNode } from "react";

export type Content = string | number | ReactNode | ReactNode[];

export function clamp(num: number, min: number, max: number): number {
    if(num < min) return min;
    if(num > max) return max;

    return num;
}

export function lerp(from: number, to: number, speed: number): number {
    return from + (to - from) * speed;
}