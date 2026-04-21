import { EventListener, inputHandled } from "@/util/dom";

export function handleInput(
    navModifier: string, 
    navKeys: string, 
    next: () => any, 
    previous: () => any
) {
    const lis = [
        new EventListener(window, "keydown", (_e) => {
            const e = _e as KeyboardEvent;
            const key = e.key.toLowerCase();

            if(inputHandled(e)) {
                return;
            }``

            if(navModifier != "None") {
                if(navModifier == "Shift" && !e.shiftKey) {
                    return;
                }

                if(navModifier == "Control" && !e.ctrlKey) {
                    return;
                }

                if(navModifier == "Alt" && !e.altKey) {
                    return;
                }
            }

            if(navKeys == "Q & E") {
                if(key == "e") {
                    next();
                    e.preventDefault();
                } else if(key == "q") {
                    previous();
                    e.preventDefault();
                }
            }

            if(navKeys == "Arrows") {
                if(key == "arrowright") {
                    next();
                    e.preventDefault();
                } else if(key == "arrowleft") {
                    previous();
                    e.preventDefault();
                }
            }
        })
    ];

    return () => {
        lis.forEach(l => l.disconnect());
    }
}