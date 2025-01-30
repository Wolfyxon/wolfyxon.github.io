"use client"

import { useEffect } from "react";

export default function Redirect(data: {url: string}) {
    useEffect(() => {
        location.href = data.url;
    });
    
    return null;
}