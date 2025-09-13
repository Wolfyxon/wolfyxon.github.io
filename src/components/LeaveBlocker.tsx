"use client";

import { useEffect } from "react";

export default function LeaveBlocker(props: {enabled?: boolean}) {
    useEffect(() => {
        function beforeunload(e: BeforeUnloadEvent) {
            e.preventDefault();
        };

        if(props.enabled ?? true) {
            window.addEventListener("beforeunload", beforeunload);
            return () => removeEventListener("beforeunload", beforeunload);
        }
    }, []);

    return (<></>)
}
