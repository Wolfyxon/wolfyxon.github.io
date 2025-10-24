
export type ElmBase = {
    id?: string,
    className?: string
}

export class EventListener {
    emitter: HTMLElement | Window;
    eventName: string;
    handler: EventListenerOrEventListenerObject;

    constructor(emitter: HTMLElement | Window, eventName: string, handler: EventListenerOrEventListenerObject) {
        this.emitter = emitter;
        this.eventName = eventName;
        this.handler = handler;
        
        emitter.addEventListener(eventName, handler);
    }

    disconnect() {
        this.emitter.removeEventListener(this.eventName, this.handler);
    }
}

export function inputHandled(event: KeyboardEvent): boolean {
    const t = event.target as HTMLElement;
    
    return (
        t && (
            (
                t.tagName == "SELECT"
            ) ||
            (
                t.tagName == "INPUT" &&
                ["text", "number"].includes((t as HTMLInputElement).type)
            )
        )
    );
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

export function classJoin(base: string, extra?: string): string {
    return `${base} ${extra ? extra : ""}`.trimEnd();
}
