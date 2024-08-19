import { TaskDocument, Task as taskSchema} from "../models/mongo/taskSchema.js";
import { Task } from "../models/task.js";

export const addTaskToMongo = async (task: TaskDocument) => {
    //add task to mongo
    try {
        const newTask = new taskSchema(task)
        await newTask.save();
        console.log("New task added to mongo!", newTask)
    } catch (error) {
        console.error(error)
    }
  }

export const convertTaskToMongo = (task: Task): TaskDocument => {
    return {
        name: task.name,
        recurrenceInterval: task.recurrenceInterval,
        tags: task.tags,
        done: task.isChecked,
        priority: task.priority,
        due: task.nextDue?? null,
        recurrenceDays: task.recurrenceDays
    } as TaskDocument
  }

export const getAllMongoTasks = async () : Promise<TaskDocument[] | undefined> => {
    try {
        const tasks = await taskSchema.find()
        return tasks
    } catch (error) {
        console.log('error fetching tasks:', error)
    }
}