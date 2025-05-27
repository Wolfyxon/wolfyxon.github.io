"use client";

import { useRef } from "react";

export type TaskData = {
    name: string,
    date: Date,
    priority: number
}

export default function Task(props: {data: TaskData, maxPriority: number, deleteHandler: (data: TaskData) => any}) {
    const data = props.data;

    const prFactor = data.priority / props.maxPriority;
    let color = "lime";

    if(prFactor >= 0.8) {
        color = "red";
    }
    else if(prFactor >= 0.7) {
        color = "orange";
    } else if(prFactor >= 0.5) {
        color = "yellow";
    } else if(prFactor >= 0.25) {
        color = "green"
    } else {
        color = "lime";
    }

    return (
        <tr>
            <td style={{background: color}}>{data.priority}</td>
            <td>{data.name}</td>
            <td style={{color: data.date.getTime() < Date.now() ? "red" : undefined}}>{data.date.toUTCString()}</td>
            
            <td>
                <button onClick={() => props.deleteHandler(data)}>Usuń</button>
            </td>
        </tr>
    )
}