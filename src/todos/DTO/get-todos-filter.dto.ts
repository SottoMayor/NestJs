import { TodoStatus } from "../todos.model";

export class GetTodosFilterDto{
    status?: TodoStatus;
    search?: string;
}