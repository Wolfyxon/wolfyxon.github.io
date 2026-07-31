export type Vector2 = {
    x: number,
    y: number
};

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

export function deg2rad(deg: number) {
    return deg * Math.PI / 180;
}

export function angleTo(x1: number, y1: number, x2: number, y2: number) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    
    return Math.atan2(dy, dx);
}

export function isColliding(x1: number, y1: number, w1: number, h1: number, x2: number, y2: number, w2: number, h2: number) {
    const left1 = x1;
    const right1 = x1 + w1;
    const top1 = y1;
    const bottom1 = y1 + h1;

    const left2 = x2;
    const right2 = x2 + w2;
    const top2 = y2;
    const bottom2 = y2 + h2;

    return !(left1 > right2 || right1 < left2 || top1 > bottom2 || bottom1 < top2);
}

export function getDistance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}
