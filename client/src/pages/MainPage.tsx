import React, { useEffect, useState } from "react";
import { Task } from "../types/taskTypes";
import Header from "../components/Header";
import TaskList from "../components/TaskList";
import { getTasks } from "../services/taskService";

const MainPage : React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        const fetchtasks = async () => {
            try {
                const data = await getTasks()
                setTasks(data)
            } catch (error) {
                console.log('error fetching tasks:', error)
            }
        }

        fetchtasks()
    }, [])

    const onToggleComplete = (id: string) => {
        setTasks((prevTasks) => prevTasks.map((task) => task._id === id? {...task, isChecked: !task.isChecked} : task))
    }

    const onDelete = (id: string) => {
        setTasks((prevTasks) => prevTasks.filter((task)=> task._id !== id))
    }

    return (
        <div className="main-page">
            <Header />
            <TaskList tasks={tasks} onToggleComplete={onToggleComplete} onDelete={onDelete} />
        </div>
    )
}

export default MainPage