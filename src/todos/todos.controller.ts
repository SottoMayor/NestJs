import { Controller, Get } from '@nestjs/common';
import { Todo } from './todos.model';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todosServices: TodosService) {}

  @Get()
  getAllTodos(): Todo[] {
    return this.todosServices.getAllTodos();
  }
}
