"use client"

import { useEffect, useState } from "react"

export default function Timestamp(props: {locale?: string}) {
    const [date, setDate] = useState<string>("00/00/000, 00:00:00");
    
    
    useEffect(() => {
        setDate(new Date().toLocaleString(props.locale ?? "en-UK"));
    }, []);

    return (
        <span>{date}</span>
    )
}
