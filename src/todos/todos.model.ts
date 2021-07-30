export interface Todo {
    id: string;
    title: string;
    text: string;
    status: TodoStatus
}

export enum TodoStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}