import "./style.css";

export default function ImageButton(props: {img: string, className?: string, id?: string, label?: string, onClick?: () => any}) {
    let className = "img-button";
    
    if(props.className) {
        className += props.className;
    }

    return (
        <button onClick={props.onClick} id={props.id} className={className}>
            <div className="img-button-img-container">
                <img src={props.img} className="img-button-img" />
                <span>{props.label}</span>
            </div>
        </button>
    );
}
