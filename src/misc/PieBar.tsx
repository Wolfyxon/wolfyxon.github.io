import React from "react";

import "./PieBar.css"

function PieBar(data: {progress?: number}) {
    const style = {
        "--pie-bar-percent": `${data.progress ?? 0}%`
    }
    
    return (
        <div className="pie-bar" style={style as React.CSSProperties}></div>
    )
}

export default PieBar;