import React from "react";
import { Task } from "../types/taskTypes";
import Taskitem from "./TaskItem";

interface TaskListProps {
    tasks : Task[],
    onToggleComplete: (id: string) => void,
    onDelete: (id: string) => void
}

const TaskList : React.FC<TaskListProps> = ({tasks, onToggleComplete, onDelete}) => {
    return (
        <div className="task-list">
            {tasks.map((task)=>(
                <Taskitem
                    key={task._id}
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}

export default TaskList