"use client";

import Checkbox from "@/components/input/Checkbox/Checkbox";

export default function HeaderSwitch(props: {disabled?: boolean}) {    
    function change(val: boolean) {
        const hdr = document.querySelector("header")!;

        // 'visibility' is slow

        if(val) {
            hdr.style.opacity = "0";
        } else {
            hdr.style.removeProperty("opacity");
        }
    }

    return (
        <Checkbox label="Hide header" onChange={change} disabled={props.disabled} />
    );
}