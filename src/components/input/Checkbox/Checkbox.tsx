"use client";

import { ChangeEvent, useState } from "react";
import { ElmBase, classJoin } from "@/util/dom";

import "./style.css";

export default function Checkbox(props: {
    label: string, 
    checked?: boolean, 
    flat?: boolean, 
    disabled?: boolean,
    confirm?: string,
    confirmOff?: string,
    confirmOn?: string,
    onChange?: (value: boolean) => any
} & ElmBase) {
    const [check, setCheck] = useState(props.checked ?? false);

    function change(e: ChangeEvent) {
        const inp = e.target as HTMLInputElement;

        const denied = props.confirm && !confirm(props.confirm);
        const deniedOn = inp.checked && props.confirmOn && !confirm(props.confirmOn);
        const deniedOff = !inp.checked && props.confirmOff && !confirm(props.confirmOff);
        
        if(denied || deniedOn || deniedOff) {
            inp.checked = check;
            e.preventDefault();

            return;
        }

        setCheck(inp.checked);
        
        if(props.onChange) {
            props.onChange(inp.checked);
        }
    }

    const flat = props.flat ? "flat" : "";

    return (
        <label className={classJoin(`checkbox-container ${flat}`, props.className)} id={props.id}>
            <div className="checkbox-container-inner">
                <input type="checkbox" aria-label={props.label} defaultChecked={check} onChange={change} disabled={props.disabled} />
                <div>{props.label}</div>
                <div className="checkbox-container-state">{String(check)}</div>
            </div>
        </label>
    );
}