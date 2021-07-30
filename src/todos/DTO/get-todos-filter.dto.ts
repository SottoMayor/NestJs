import { TodoStatus } from "../todos.model";
import { IsOptional, IsString, IsEnum } from "class-validator";

export class GetTodosFilterDto{
    @IsOptional()
    @IsEnum(TodoStatus)
    status?: TodoStatus;

    @IsOptional()
    @IsString()
    search?: string;
}