import { ReactNode } from "react";

import "./Widget.css";

export default function Widget(props: {title: string, url?: string, children: ReactNode}) {
    const body = (
    <>
        <div className="widget-title-container">
            <div className="widget-title">{props.title}</div>
            
            {
                props.url ? <img className="widget-title-icon" src="/assets/media/img/icons/google/open_in_new.svg" />
                : null
            }
        </div>
        
        <div className="widget-content">
            {props.children}
        </div>
    </>
    );

    return (
        props.url ? 
            <a href={props.url} className="widget">{body}</a> : 
            <div className="widget">{body}</div>
    );
}