"use client";

import { useEffect, useState } from "react";
import HomePage from "../page";

export default function ShadowHomePage() {
    const [visible, setVisible] = useState(false);
    
    useEffect(() => {
        setVisible(true);
    });

    return (
        <>
        
        {
            visible ?
            <HomePage/>
            : 
            <p>
                Please enable JavaScript
            </p>
        }
        
        </>
    );
}