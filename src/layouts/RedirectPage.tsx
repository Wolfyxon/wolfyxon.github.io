"use client"

import { ReactNode, useEffect } from "react";
import Root from "./Root";

export default function RedirectPage(props: {url: string, children?: ReactNode}) {
    useEffect(() => {
        location.href = props.url;
    });
    
    return (
        <Root>
            <head>
                <meta httpEquiv="refresh" content={`0; url=${props.url}`} />
            </head>
            <body>
                {props.children}
            </body>
        </Root>
    );
}
