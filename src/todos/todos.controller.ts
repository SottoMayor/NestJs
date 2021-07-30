import { Body, Controller, Get, Post } from '@nestjs/common';
import { Todo } from './todos.model';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './DTO/create-todos.dto';

@Controller('todos')
export class TodosController {
  constructor(private todosServices: TodosService) {}

  @Get()
  getAllTodos(): Todo[] {
    return this.todosServices.getAllTodos();
  }

  @Post()
  createTodo(@Body() CreateTodoDto: CreateTodoDto ): Todo{
    return this.todosServices.createTodo(CreateTodoDto);
  }

}
