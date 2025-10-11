"use client";

import Checkbox from "@/components/input/Checkbox/Checkbox";

export default function HeaderSwitch(props: {disabled?: boolean}) {    
    function change(val: boolean) {
        const hdr = document.querySelector("header")!;
        
        if(val) {
            hdr.style.display = "none";
        } else {
            hdr.style.removeProperty("display");
        }
    }

    return (
        <Checkbox label="Hide header" onChange={change} disabled={props.disabled} />
    );
}