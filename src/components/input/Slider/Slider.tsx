import { ChangeEvent, useState } from "react"

import "./style.css";
import { ElmBase } from "@/utils";

export type SliderProps = {
    label?: string,
    ariaLabel?: string, 
    min?: number,
    max?: number,
    step?: number,
    value?: number,
    disabled?: boolean,
    flat?: boolean,
    onChange?: ((val: number) => void)
} & ElmBase;

export default function Slider(props: SliderProps) {
    const [value, setValue] = useState(props.value ?? (props.min ?? 0));

    function changed(e: ChangeEvent) {
        const inp = e.target! as HTMLInputElement;
        
        const num = parseFloat(inp.value);

        if(isNaN(num)) {
            setValue(value);
            return;
        }

        setValue(num);

        if(props.onChange) {
            props.onChange(num);
        }
    }

    const flat = props.flat ? "flat" : "";

    return (
        <div className={`slider ${flat} ${props.className ? props.className : ""}`} id={props.id}>
            <label className={`slider-inner ${flat}`}>
                {!props.flat ? <span className="slider-label">{props.label}</span> : null}

                <input type="range" 
                    aria-label={props.ariaLabel}
                    value={value}
                    onChange={changed}
                    min={props.min}
                    max={props.max}
                    step={props.step}
                    disabled={props.disabled}
                />

                {!props.flat ? <input type="number" 
                    aria-label={props.ariaLabel}
                    value={value}
                    onChange={changed}
                    min={props.min}
                    max={props.max}
                    step={props.step}
                    disabled={props.disabled}
                /> : null}
            </label>
        </div>
    )
}
