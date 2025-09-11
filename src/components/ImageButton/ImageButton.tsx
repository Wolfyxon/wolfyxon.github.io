import "./style.css";

export default function ImageButton(props: {
    img: string, 
    className?: string, 
    id?: string, 
    label?: string, 
    ariaLabel?: string, 
    onClick?: () => any,
    disabled?: boolean
}) {
    let className = "img-button";
    
    if(props.className) {
        className += " " + props.className;
    }

    return (
        <button onClick={props.onClick} id={props.id} className={className} aria-label={props.ariaLabel ?? props.label} disabled={props.disabled}>
            <div className="img-button-img-container">
                <img src={props.img} className="img-button-img" alt="icon" />
                <span className="img-button-label">{props.label}</span>
            </div>
        </button>
    );
}
