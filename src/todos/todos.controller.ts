import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './DTO/create-todos.dto';
import { GetTodosFilterDto } from './DTO/get-todos-filter.dto';
import { Todo } from './todos.entity';

@Controller('todos')
export class TodosController {
  constructor(private todosServices: TodosService) {}

  // @Get()
  // getTodos( @Query() getTodosFilter: GetTodosFilterDto ): Todo[] {
  //   if(Object.keys(getTodosFilter).length){
  //     return this.todosServices.getTodosFiltered(getTodosFilter); 
  //   }else{
  //     return this.todosServices.getAllTodos();
  //   }
  // }


  @Get('/:id')
  getTodoByid(@Param('id') id: string): Promise<Todo>{
    return this.todosServices.getTodoById(id);
  }

  @Post()
  createTodo(@Body() createTodo: CreateTodoDto){
    return this.todosServices.createTodo(createTodo)
  }

 @Delete('/:id')
 deleteTodoById(@Param('id') id: string): Promise<void>{
   return this.todosServices.deleteTodoById(id);
 }

  // @Delete('/:id')
  // deleteTodoById(@Param('id') id: string): void{
  //   return this.todosServices.deleteTodoById(id)
  // }

  // @Patch('/:id/:status')
  // updatedTodoById(@Param('id') id: string, @Param('status') status: string): Todo{
  //   if(['OPEN', 'IN_PROGRESS', 'DONE'].some( key => key === status )){
  //     return this,this.todosServices.updatedTodoById(id, status);
  //   }else{
  //     throw new BadRequestException('This status is impossible of get to any Todo!')
  //   }
  // }

}
