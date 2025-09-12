import "./style.css";

export default function Checkbox(props: {label: string}) {
    return (
        <label className="checkbox-container">
            <div className="checkbox-container-inner">
                <input type="checkbox" aria-label={props.label} />
                <div>{props.label}</div>
                <div className="checkbox-container-state">true</div>
            </div>
        </label>
    );
}