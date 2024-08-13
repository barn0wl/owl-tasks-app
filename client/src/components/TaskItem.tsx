import React from "react";
import { Task } from "../types/taskTypes";

interface TaskItemProps {
    task : Task
    onToggleComplete : (id: string) => void
    onDelete : (id: string) => void
}

const Taskitem : React.FC<TaskItemProps> = ({task, onToggleComplete, onDelete}) => {
    const {_id, name, priority, isChecked, nextDue} = task

    return (
        <div className= 'task-item'>
            <h3>{name}</h3>
            <p>Priority: {priority}</p>
            <p>Due: {nextDue}</p>
            <p>Completed: {isChecked? 'Yes' : 'No'}</p>
            <div className="task-actions">
                <button onClick={ () => onToggleComplete(_id) }>
                   {isChecked? 'Undo' : 'Complete'} 
                </button>
                <button onClick={ ()=> {onDelete(_id)} }>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default Taskitem