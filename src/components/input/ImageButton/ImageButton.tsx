import { ElmBase, classJoin } from "@/util/dom";
import "./style.css";

export default function ImageButton(props: {
    img: string, 
    label?: string, 
    title?: string,
    ariaLabel?: string, 
    onClick?: () => any,
    disabled?: boolean,
    reverse?: boolean
} & ElmBase) {
    const image = (
        <img src={props.img} className="img-button-img" alt="icon" />
    );

    return (
        <button 
                id={props.id} 
                className={classJoin("img-button", props.className)} 
                onClick={props.onClick} 
                aria-label={props.ariaLabel ?? props.label} 
                title={props.title}
                disabled={props.disabled}
            >
            <div className="img-button-img-container">
                {props.reverse ? null : image}
                <span className="img-button-label">{props.label}</span>
                {props.reverse ? image : null}
                <div></div>
            </div>
        </button>
    );
}
