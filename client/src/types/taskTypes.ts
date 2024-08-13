export interface Task {
    _id: string,
    name: string,
    nextDue : string,
    priority: Priority,
    isChecked : boolean,
    recurrenceInterval: 'N/A' | 'Daily' | 'Weekly' | 'Monthly',
    recurrenceDays?: Weekday[]
}

enum Weekday {
    Sunday = 0,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}

enum Priority {
    None = 0,
    Low,
    Mid,
    High
}