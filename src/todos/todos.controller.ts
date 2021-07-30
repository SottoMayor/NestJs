import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Delete('/:id')
  deleteTodoById(@Param('id') id: string): void{
    return this.todosServices.deleteTodoById(id)
  }

  @Patch('/:id/:status')
  updatedTodoById(@Param('id') id: string, @Param('status') status: string): Todo{
    return this,this.todosServices.updatedTodoById(id, status);
  }

}
