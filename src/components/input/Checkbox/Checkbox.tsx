import { ChangeEvent, useState } from "react";
import "./style.css";

export default function Checkbox(props: {
    label: string, 
    checked?: boolean, 
    flat?: boolean, 
    onChange?: (value: boolean) => any}
) {
    const [check, setCheck] = useState(props.checked ?? false);

    function change(e: ChangeEvent) {
        const inp = e.target as HTMLInputElement;

        setCheck(inp.checked);
        
        if(props.onChange) {
            props.onChange(inp.checked);
        }
    }

    const flat = props.flat ? "flat" : "";

    return (
        <label className={`checkbox-container ${flat}`}>
            <div className="checkbox-container-inner">
                <input type="checkbox" aria-label={props.label} defaultChecked={check} onChange={change} />
                <div>{props.label}</div>
                <div className="checkbox-container-state">{String(check)}</div>
            </div>
        </label>
    );
}