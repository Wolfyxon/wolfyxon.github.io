import { ReactNode } from "react";

import "./Warning.css";

export default function Warning(props: {children: ReactNode, title?: string}) {
    return (
        <div className="warning-block">
            <div className="warning-block-content">
                {
                    props.title ?
                    <h1 className="warning-block-title">{props.title}</h1>
                    : null
                }
                
                {props.children}
            </div>
        </div>
    )
}
