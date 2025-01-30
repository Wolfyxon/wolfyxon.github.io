"use client"

import { useEffect } from "react";

export default function Redirect(data: {url: string}) {
    useEffect(() => {
        location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    });
    
    return null;
}