import { Priority, RecurrenceInterval, Weekday } from "./types.js";

export class Task {
    private _id: string = ""
    public name: string
    public nextDue: Date | null
    public priority: Priority
    public isChecked: boolean
    public tags: string[]
    public recurrenceInterval: RecurrenceInterval
    public recurrenceDays?: Weekday[]

    constructor(
        name: string,
        isChecked?: boolean,
        tags?: string[],
        recurrenceInterval?: RecurrenceInterval,
        priority?: Priority,
        nextDue?: Date,
        recurrenceDays?: Weekday[]
    ) {
        this.name = name
        this.tags = tags?? []
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