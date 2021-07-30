import { TodoStatus } from "../todos-status.enum";
import { IsOptional, IsString, IsEnum } from "class-validator";

export class GetTodosFilterDto{
    @IsOptional()
    @IsEnum(TodoStatus)
    status?: TodoStatus;

    @IsOptional()
    @IsString()
    search?: string;
}