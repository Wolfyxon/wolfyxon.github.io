import { ReactNode } from "react";

import "./Widget.css";

export default function Widget(props: {title: string, url?: string, children: ReactNode}) {
    const body = (
    <>
        <div className="widget-title">
            {props.title}
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