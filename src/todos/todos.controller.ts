import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get('/:id')
  getTodoById(@Param('id') id: string): Todo{
    return this.todosServices.getTodoById(id);
  } 

  @Post()
  createTodo(@Body() CreateTodoDto: CreateTodoDto ): Todo{
    return this.todosServices.createTodo(CreateTodoDto);
  }

}
