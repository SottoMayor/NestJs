import { Body, Controller, Get, Post } from '@nestjs/common';
import { Todo } from './todos.model';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todosServices: TodosService) {}

  @Get()
  getAllTodos(): Todo[] {
    return this.todosServices.getAllTodos();
  }

  @Post()
  createTodo(@Body('title') title: string, @Body('text') text:string): Todo{
    return this.todosServices.createTodo(title, text);
  }

}
