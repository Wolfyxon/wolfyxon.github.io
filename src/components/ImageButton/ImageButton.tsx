import { ElmBase, classJoin } from "@/utils";
import "./style.css";

export default function ImageButton(props: {
    img: string, 
    label?: string, 
    ariaLabel?: string, 
    onClick?: () => any,
    disabled?: boolean
} & ElmBase) {
    return (
        <button onClick={props.onClick} id={props.id} className={classJoin("img-button", props.className)} aria-label={props.ariaLabel ?? props.label} disabled={props.disabled}>
            <div className="img-button-img-container">
                <img src={props.img} className="img-button-img" alt="icon" />
                <span className="img-button-label">{props.label}</span>
            </div>
        </button>
    );
}
