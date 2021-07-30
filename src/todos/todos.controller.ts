import { Controller, Get } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todosServices: TodosService) {}

  @Get()
  getAllTodos() {
    return this.todosServices.getAllTodos();
  }
}
