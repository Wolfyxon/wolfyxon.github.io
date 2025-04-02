"use client"

import { useEffect, useRef } from "react";

export type TimerProps = {
    untilDate?: Date, 
    seconds?: number,
    id?: string,
    className?: string, 
    children: string,
    onEnd?: () => any 
};

export default function Timer(data: TimerProps) {
    const timerRef = useRef(null);
    
    useEffect(() => {
        const timer = timerRef.current! as HTMLSpanElement;
        const format = data.children;
        
        const start = Date.now();
        const end = data.untilDate?.getTime() ?? start + data.seconds! * 1000

        let itv: NodeJS.Timeout;

        function update() {
            if(!itv) return;

            const offset = Math.max(end - Date.now(), 0);

            if(offset <= 0) {
                clearInterval(itv);
                if(data.onEnd) data.onEnd();
            }

            const replMap = {
                "d": Math.floor(offset / (1000 * 60 * 60 * 24)),
                "h": Math.floor((offset % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                "m": Math.floor((offset % (1000 * 60 * 60)) / (1000 * 60)),
                "s": Math.floor((offset % (1000 * 60)) / 1000)
            };

            let text = format;

            Object.entries(replMap).forEach((e) => {
                const key = e[0];
                const time = e[1];

                text = text.replace(`%${key}`, time.toString());
            });

            timer.innerText = text;
        }

        itv = setInterval(update, 1000);
        update();
    }, []);

    return <span ref={timerRef} className={data.className ?? "" + " timer"} id={data.id}></span>
}