"use client";

import { useEffect } from "react";

export default function LinkHoverEasterEgg() {
    useEffect(() => {
        const parentElms = document.querySelectorAll(".project-extra");
        const order: HTMLElement[] = [];
        let buf = [];

        for(let i = 0; i < parentElms.length; i++) {
            const parent = parentElms[i];
            const links = parent.querySelectorAll("a");

            if(i % 2 == 0) {
                for(const link of links) {
                    order.push(link);
                }
            } else {
                for(let j = links.length - 1; j >= 0; j--) {
                    order.push(links[j]);
                }
            }
        }

        for(const link of order) {
            link.addEventListener("mouseover", (e) => {
                const link = e.target;
                
                buf.push(link);

                if(order[buf.length - 1] != link) {
                    buf = [];
                    return;
                }

                if(buf.length == order.length) {
                    buf = [];
                    alert("Sorry bro this easter egg is still under construction");
                }
            });
        }

    }, []);
    
    return (<></>);
}