
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

export function pad(number: number, zeros?: number): string {
    return number.toString().padStart(zeros ?? 2, "0");
}