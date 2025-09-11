
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