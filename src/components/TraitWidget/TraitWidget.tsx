import { ReactNode } from "react";
import "./style.css";
import { ElmBase, classJoin } from "@/util/dom";

export default function TraitWidget(props: {
    children: ReactNode, 
    title: string, 
    icon: string, 
    iconAlt: string
} & ElmBase) {
    return (
        <div className={classJoin("trait-widget", props.className)} id={props.id}>
            <img src={props.icon} alt={props.iconAlt} className="trait-widget-icon"/>
            <h2 className="trait-widget-header">{props.title}</h2>
            <div className="trait-widget-content">
                {props.children}
            </div>
        </div>
    );
}
