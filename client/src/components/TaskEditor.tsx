import { FC, useState, ChangeEvent, FormEvent } from "react";
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

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target;
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

    const handleRecurrenceDaysChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedDays = Array.from(e.target.selectedOptions, option => parseInt(option.value) as Weekday);
        setTask(prev => ({
            ...prev,
            recurrenceDays: selectedDays,
        }));
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Process the task data
        console.log('Task Submitted:', task);
    }

    return (
        <div className="task-editor">
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={task.name}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Next Due Date:
                    <input
                        type="date"
                        name="nextDue"
                        value={task.nextDue}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Priority:
                    <select
                        name="priority"
                        value={task.priority}
                        onChange={handleChange}
                    >
                        <option value={Priority.None}>None</option>
                        <option value={Priority.Low}>Low</option>
                        <option value={Priority.Mid}>Medium</option>
                        <option value={Priority.High}>High</option>
                    </select>
                </label>

                <label>
                    Is Checked:
                    <input
                        type="checkbox"
                        name="isChecked"
                        checked={task.isChecked}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Tags:
                    <input
                        type="text"
                        name="tags"
                        value={task.tags.join(', ')}
                        onChange={(e) => setTask(prev => ({ ...prev, tags: e.target.value.split(',').map(tag => tag.trim()) }))}
                    />
                </label>

                <label>
                    Recurrence Interval:
                    <select
                        name="recurrenceInterval"
                        value={task.recurrenceInterval}
                        onChange={handleChange}
                    >
                        <option value="N/A">N/A</option>
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                </label>

                {task.recurrenceInterval !== 'N/A' && (
                    <label>
                        Recurrence Days:
                        <select
                            multiple
                            name="recurrenceDays"
                            value={task.recurrenceDays || undefined}
                            onChange={handleRecurrenceDaysChange}
                        >
                            {Object.values(Weekday).map(day => (
                                <option key={day} value={Weekday[day]}>
                                    {Weekday[day]}
                                </option>
                            ))}
                        </select>
                    </label>
                )}

                <button type="submit">Save Task</button>
            </form>
        </div>
    )
}