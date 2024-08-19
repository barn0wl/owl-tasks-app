export interface Task {
    _id: string,
    name: string,
    nextDue : string,
    priority: Priority,
    isChecked : boolean,
    tags: string[],
    recurrenceInterval: 'N/A' | 'Daily' | 'Weekly' | 'Monthly',
    recurrenceDays?: Weekday[]
}

export enum Weekday {
    Sunday = 0,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}

export enum Priority {
    None = 0,
    Low,
    Mid,
    High
}