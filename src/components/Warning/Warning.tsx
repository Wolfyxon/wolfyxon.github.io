import { ReactNode } from "react";

import "./Warning.css";

export default function Warning(props: {children: ReactNode}) {
    return (
        <div className="warning-block">
            <div className="warning-block-content">
                {props.children}
            </div>
        </div>
    )
}
