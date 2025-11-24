import { ReactNode } from "react";

import "./style.css";

export default function Widget(props: {title: string, url?: string, children: ReactNode}) {
    const body = (
    <>
        <div className="widget-title-container">
            <div className="widget-title">{props.title}</div>
            
            {
                props.url ? 
                <img
                    alt="Open" 
                    className="widget-title-icon" 
                    src="/assets/img/icons/google/arrow-outward.svg" />
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