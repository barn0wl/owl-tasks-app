import { Priority, RecurrenceInterval, Weekday } from "./types.js";

export class Task {
    private _id: string = ""
    public name: string
    public nextDue: Date | null
    public priority: Priority
    public isChecked: boolean
    public recurrenceInterval: RecurrenceInterval
    public recurrenceDays?: Weekday[]

    constructor(
        name: string,
        recurrenceInterval?: RecurrenceInterval,
        isChecked?: boolean,
        priority?: Priority,
        nextDue?: Date,
        recurrenceDays?: Weekday[]
    ) {
        this.name = name
        this.recurrenceInterval = recurrenceInterval?? RecurrenceInterval.None
        this.isChecked = isChecked?? false
        this.nextDue = nextDue?? null
        this.priority = priority?? Priority.None
        this.recurrenceDays = recurrenceDays
    }

    public get id(): string {
        return this._id
    }

    private set id(newId: string) {
        this._id = newId
    }

    public updateId(newId: string) {
        this.id = newId
    }
}