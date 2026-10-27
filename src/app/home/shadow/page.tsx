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
            <div>
                Please enable JavaScript
            </div>
        }
        
        </>
    );
}