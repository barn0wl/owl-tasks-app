import { FC, useState, ChangeEvent } from "react";
import { Priority, Weekday } from "../types/taskTypes";

interface TaskProp {
    name: string,
    nextDue : string,
    priority: Priority,
    isChecked : boolean,
    tags: string[],
    recurrenceInterval: 'N/A' | 'Daily' | 'Weekly' | 'Monthly',
    recurrenceDays?: Weekday[]
}

const TaskEditor : FC = () => {

    const [task, setTask] = useState<TaskProp>({
        name: '',
        nextDue: '',
        priority: Priority.None,
        isChecked: false,
        tags: [],
        recurrenceInterval: 'N/A'
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        if (type === 'checkbox') {
            setTask(prev => ({
                ...prev,
                [name]: checked,
            }));
        } else {
            setTask(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    }

    return (
        <div className="task-editor">
            <input type="text" />
        </div>
    )
}