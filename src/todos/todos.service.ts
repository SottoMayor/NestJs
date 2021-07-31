import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoStatus } from './todos-status.enum';
import { CreateTodoDto } from './DTO/create-todos.dto';
import { GetTodosFilterDto } from './DTO/get-todos-filter.dto';
import { TodoRepository } from './todos.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todos.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoRepository)
    private TodoRepository: TodoRepository
    ){}



  // public getAllTodos(): Todo[] {
  //   return this.todos;
  // }

  // public getTodosFiltered(getTodosFilter): Todo[] {

  //   const { status, search } = getTodosFilter;

  //   let filteredTodos = this.getAllTodos();

  //   if(status){
  //     filteredTodos = filteredTodos.filter( todoItem => todoItem.status === status );
  //   }

  //   if (search){
  //     filteredTodos = filteredTodos.filter( todoItem => {
  //       if(todoItem.title.includes(search) || todoItem.text.includes(search)){
  //         return true;
  //       }
  //         return false;
  //     })
  //   }

  //   return filteredTodos;
  // }

  public createTodo(CreateTodo): Promise<Todo>{
    return this.TodoRepository.createTodo(CreateTodo)
  }

  public async getTodoById(id: string): Promise<Todo>{
    const todoFound = await this.TodoRepository.findOne(id);
    
    if(!todoFound){
      throw new NotFoundException(`The todo with ID ${id} was not found!`);
    }

    return todoFound;
  }

  // public deleteTodoById(id: string): void{
  //   const deletedTodoIndex = this.todos.findIndex(todoItem => todoItem.id === id);

  //   if(deletedTodoIndex === -1){
  //     throw new NotFoundException(`The Todo with ID ${id} was not found!`);
  //   }

  //   this.todos.splice(deletedTodoIndex, 1);
  // }

  // public updatedTodoById(id: string, status: string): Todo{
  //   const updatedTodoIndex = this.todos.findIndex( todoItem => todoItem.id === id );

  //   if(updatedTodoIndex === -1){
  //     throw new NotFoundException(`The Todo with ID ${id} was not found!`);
  //   }

  //   this.todos[updatedTodoIndex] = {
  //     ...this.todos[updatedTodoIndex],
  //     status: TodoStatus[status]
  //   }
  //   return this.todos[updatedTodoIndex];
  // }
  

}
