import { DateTime } from "luxon";
import { Task } from "../models/task.js";
import { RecurrenceInterval, Weekday } from "../models/types.js";
import { TaskDocument } from "../models/mongo/taskSchema.js";
import { getAllMongoTasks } from "./mongoService.js";

export const convertMongoToTask = (mongoTask: TaskDocument) : Task => {
    const id = mongoTask._id as string
    const name = mongoTask.name
    const tags = mongoTask.tags
    const nextDue = mongoTask.due
    const priority = mongoTask.priority
    const isChecked = mongoTask.done
    const recurrenceDays = mongoTask.recurrenceDays
    const recurrenceInterval = mongoTask.recurrenceInterval
    var newTask = recurrenceDays? new Task(name, isChecked, tags, recurrenceInterval, priority, nextDue, recurrenceDays) : new Task(name, isChecked, tags, recurrenceInterval, priority, nextDue)
    newTask.updateId(id)
    return newTask
}

export const calculateNextDue = (task: Task) : Date | null  => {
    const currentDue = task.nextDue
    const interval = task.recurrenceInterval
    const recurrenceDays = task.recurrenceDays
    if (currentDue == null) {
        return null
    }
    const nextDue = new Date(currentDue)
    switch (interval) {
        case RecurrenceInterval.Daily:
            nextDue.setDate(nextDue.getDate() + 1)
            break
        case RecurrenceInterval.Weekly:
            if (recurrenceDays && recurrenceDays.length > 0) {
                let nextDayFound = false
                while (!nextDayFound) {
                    nextDue.setDate(nextDue.getDate() + 1)
                    if (recurrenceDays.includes(nextDue.getDay() as Weekday)) {
                        nextDayFound = true
                    }
                }
            } else {
                nextDue.setDate(nextDue.getDate() + 7)
            }
            break
        case RecurrenceInterval.Monthly:
            nextDue.setMonth(nextDue.getMonth() + 1)
            break;
    }
    return nextDue
}

export const parseStringToDate = (dateString: string): Date | undefined => {
    try {
        const FORMAT = 'yyyy-MM-dd'
        const dateTime = DateTime.fromFormat(dateString, FORMAT)
        return dateTime.toJSDate()
    } catch (error) {
        console.log("Error parsing date:", error)
        return undefined
    }
}

export const getAllTasks = async () : Promise<Task[]> => {
    const tasks = await getAllMongoTasks()
    const parsedTasks : Task[] = []
    if (tasks) {
        tasks.forEach((task) => parsedTasks.push(convertMongoToTask(task)))
    }
    return parsedTasks
}