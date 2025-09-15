import { ChangeEvent, useState } from "react"

import "./style.css";

export default function Slider(props: {
    label?: string,
    ariaLabel?: string, 
    min?: number,
    max?: number,
    step?: number
    onChange?: ((val: number) => void)
    value?: number
}) {
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

    return (
        <div className="slider">
            <label className="slider-inner">
                {props.label}

                <input type="range" 
                    aria-label={props.ariaLabel}
                    value={value}
                    onChange={changed}
                    min={props.min}
                    max={props.max}
                    step={props.step}
                />

                <input type="number" 
                    aria-label={props.ariaLabel}
                    value={value}
                    onChange={changed}
                    min={props.min}
                    max={props.max}
                    step={props.step}
                />
            </label>
        </div>
    )
}
