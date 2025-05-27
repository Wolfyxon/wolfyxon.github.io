"use client";

import { useRef } from "react";

export type TaskData = {
    name: string,
    date: Date,
    priority: number
}

export default function Task(props: {data: TaskData, deleteHandler: (data: TaskData) => any}) {
    const ref = useRef<HTMLTableRowElement>(null);
    const data = props.data;

    return (
        <tr>
            <td>{data.priority}</td>
            <td>{data.name}</td>
            <td>{data.date.toUTCString()}</td>
            
            <td>
                <button onClick={() => props.deleteHandler(data)}>Usuń</button>
            </td>
        </tr>
    )
}