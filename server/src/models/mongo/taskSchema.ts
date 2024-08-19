import mongoose, {Document, Schema} from "mongoose";
import { Priority, RecurrenceInterval, Weekday } from "../types.js";

export interface TaskDocument extends Document {
    name: string,
    recurrenceInterval: RecurrenceInterval,
    tags: string[]
    done: boolean,
    priority: Priority,
    due?: Date,
    recurrenceDays?: Weekday[]
}

const taskSchema = new Schema<TaskDocument>({
    name: {type: String, required: true},
    done: {type: Boolean, required: true},
    tags: {type: [String], required: true},
    recurrenceInterval: {type: String, required: true, enum: Object.values(RecurrenceInterval)},
    priority: {type: Number, required: true, enum: [Priority.None, Priority.Low, Priority.Mid, Priority.High]},
    due: {type: Date},
    recurrenceDays: {type: [Number], enum: Object.values(Weekday)}
})

export const Task = mongoose.model<TaskDocument>('Task', taskSchema)
  