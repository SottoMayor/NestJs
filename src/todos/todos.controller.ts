import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './DTO/create-todos.dto';
import { GetTodosFilterDto } from './DTO/get-todos-filter.dto';
import { Todo } from './todos.entity';
import { TodoStatus } from './todos-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-users.decorator';
import { User } from 'src/auth/user.entity';

@Controller('todos')
@UseGuards(AuthGuard())
export class TodosController {
  constructor(private todosServices: TodosService) {}

  @Get()
  getTodos(@Query() GetTodosFilterDto: GetTodosFilterDto,
           @GetUser() user: User): Promise<Todo[]>{
    return this.todosServices.getTodos(GetTodosFilterDto, user)
  }


  @Get('/:id')
  getTodoByid(@Param('id') id: string, @GetUser() user: User): Promise<Todo>{
    return this.todosServices.getTodoById(id, user);
  }

  @Post()
  createTodo(@Body() createTodo: CreateTodoDto,
             @GetUser() user: User){
    return this.todosServices.createTodo(createTodo, user)
  }

 @Delete('/:id')
 deleteTodoById(@Param('id') id: string): Promise<void>{
   return this.todosServices.deleteTodoById(id);
 }

 @Patch('/:id/status')
 updatedTodoById(@Param('id') id: string, @Body('status') status: TodoStatus, @GetUser() user: User): Promise<Todo>{
  return this.todosServices.updatedTodoById(id, status, user);
 }

}
