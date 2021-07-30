import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Todo } from './todos.model';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './DTO/create-todos.dto';
import { GetTodosFilterDto } from './DTO/get-todos-filter.dto';

@Controller('todos')
export class TodosController {
  constructor(private todosServices: TodosService) {}

  @Get()
  getTodos( @Query() getTodosFilter: GetTodosFilterDto ): Todo[] {
    if(Object.keys(getTodosFilter).length){
      return this.todosServices.getTodosFiltered(getTodosFilter); 
    }else{
      return this.todosServices.getAllTodos();
    }
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
    if(['OPEN', 'IN_PROGRESS', 'DONE'].some( key => key === status )){
      return this,this.todosServices.updatedTodoById(id, status);
    }else{
      throw new BadRequestException('This status is impossible of get to any Todo!')
    }
  }

}
