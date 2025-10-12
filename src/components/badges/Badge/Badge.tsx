import { ElmBase, classJoin } from "@/utils";
import "./Badge.css";

export default function Badge(props: {
    icon: string, 
    alt: string, 
    translate?: "no" | "yes"
} & ElmBase) {
    return (
        <div className={classJoin("badge", props.className)} id={props.id}>
            <img className="badge-img" src={"/assets/media/img/icons/" + props.icon} alt={props.alt} />
            <div className="badge-label" translate={props.translate ?? "no"}>{props.alt}</div>
        </div>
    );
}
