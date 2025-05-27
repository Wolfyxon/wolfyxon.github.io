"use client";

import { useRef, useState } from "react";
import Task, { TaskData } from "./Task";

import "@/app/css/bigCenter.css";
import "./style.css";

export default function Tasks() {
    const [tasks, setTasks] = useState<TaskData[]>([]);

    const priorityRef = useRef<HTMLInputElement | null>(null);
    const nameRef = useRef<HTMLInputElement | null>(null);
    const dateRef = useRef<HTMLInputElement>(null);
    
    function addTask() {
        const prio = parseInt(priorityRef.current!.value);
        const name = nameRef.current!.value;
        const date = new Date(dateRef.current!.value);

        if(!prio || !name || !date) return;
        
        const task: TaskData = {
                name: name,
                priority: prio,
                date: date
        }

        setTasks(
            [...tasks, task].sort((a, b) => b.priority - a.priority)
        );
    }

    function deleteTask(task: TaskData) {
        setTasks(tasks.filter((v) => v != task));
    }

    return (
        <>
        
        <table id="task-list">
            <tr>
                <th id="col-priority">
                    <input type="number" placeholder="Priorytet..." ref={priorityRef} />
                </th>
                <th id="col-name">
                    <input type="text" placeholder="Nazwa..." ref={nameRef} />
                </th>
                <th id="col-date">
                    <input type="date" placeholder="Data..." ref={dateRef} />
                </th>
                <th id="col-action">
                    <button onClick={addTask}>Dodaj</button>
                </th>
            </tr>
            {
                tasks.map((data) => <Task data={data} deleteHandler={deleteTask} />)
            }
        </table>
        
        </>
    )
}