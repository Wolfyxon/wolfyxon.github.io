"use client"

import { ElmBase, classJoin } from "@/util/dom";
import { useEffect, useRef } from "react";

export type TimerProps = {
    untilDate?: Date, 
    seconds?: number,
    children: string,
    onEnd?: () => any 
} & ElmBase;

export default function Timer(data: TimerProps) {
    const timerRef = useRef(null);
    
    useEffect(() => {
        const timer = timerRef.current! as HTMLSpanElement;
        const format = data.children;
        
        const start = Date.now();
        const end = data.untilDate?.getTime() ?? start + data.seconds! * 1000

        let itv: NodeJS.Timeout;

        function pad(num: number | string): string {
            return num.toString().padStart(2, "0");
        }

        function update() {
            if(!itv) return;

            const offset = Math.max(end - Date.now(), 0);

            if(offset <= 0) {
                clearInterval(itv);
                if(data.onEnd) data.onEnd();
            }

            const replMap: Record<string, number | string> = {
                "d": Math.floor(offset / (1000 * 60 * 60 * 24)),
                "h": Math.floor((offset % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                "m": Math.floor((offset % (1000 * 60 * 60)) / (1000 * 60)),
                "s": Math.floor((offset % (1000 * 60)) / 1000),
            };

            replMap.hh = pad(replMap.h);
            replMap.mm = pad(replMap.m);
            replMap.ss = pad(replMap.s);
            
            let text = format;
            const entries = Object.entries(replMap);
            
            entries.sort((a, b) => {
                if(a[0].length > b[0].length) { 
                    return -1 
                }

                return 1;
            });

            entries.forEach((e) => {
                const key = e[0];
                const time = e[1];

                text = text.replace(`%${key}`, time.toString());
            });

            timer.innerText = text;
        }

        itv = setInterval(update, 1000);
        update();
    }, []);

    return <span ref={timerRef} className={classJoin("timer", data.className)} id={data.id}></span>
}