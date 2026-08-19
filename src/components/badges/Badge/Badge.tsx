import { ElmBase, classJoin } from "@/util/dom";
import "./Badge.css";

export default function Badge(props: {
    icon: string, 
    alt: string, 
    translate?: "no" | "yes",
    onClick?: () => any | void
} & ElmBase) {
    return (
        <div 
            className={classJoin("badge", props.className)} 
            id={props.id} 
            onClick={props.onClick}
            style={props.onClick ? {cursor: "pointer"} : undefined}
        >
            <img className="badge-img" src={"/assets/img/icons/" + props.icon} alt={props.alt} />
            <div className="badge-label" translate={props.translate ?? "no"}>{props.alt}</div>
        </div>
    );
}
