import { IsNotEmpty, Length } from "class-validator";

export class CreateTodoDto {
    @Length(5, 100, {
        message: "This message was provided by me, the developer!"
    })
    title: string;


    @IsNotEmpty()
    text: string;
}