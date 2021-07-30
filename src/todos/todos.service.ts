import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todos.model';
import { TodoStatus } from './todos.model';
import { v4 as uuid } from 'uuid'
import { CreateTodoDto } from './DTO/create-todos.dto';
import { GetTodosFilterDto } from './DTO/get-todos-filter.dto';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];

  public getAllTodos(): Todo[] {
    return this.todos;
  }

  public getTodosFiltered(getTodosFilter): Todo[] {

    const { status, search } = getTodosFilter;

    let filteredTodos = this.getAllTodos();

    if(status){
      filteredTodos = filteredTodos.filter( todoItem => todoItem.status === status );
    }

    if (search){
      filteredTodos = filteredTodos.filter( todoItem => {
        if(todoItem.title.includes(search) || todoItem.text.includes(search)){
          return true;
        }
          return false;
      })
    }

    return filteredTodos;
  }

  public createTodo(CreateTodoDto): Todo{
    // Creating the todo in DTO approach

    const { title, text } = CreateTodoDto;

    const todo: Todo = {
      id: uuid(),
      title: title,
      text: text,
      status: TodoStatus.OPEN
    }
    // pushing it
    this.todos.push(todo);
    // returning it
    return todo;
  }

  public getTodoById(id: string): Todo{
    const todoFound = this.todos.find( todoItem => todoItem.id === id);
    if(!todoFound){
      throw new NotFoundException(`The todo with ID ${id} was not found!`)
    }
    return todoFound;
  }

  public deleteTodoById(id: string): void{
    const deletedTodoIndex = this.todos.findIndex(todoItem => todoItem.id === id);

    if(deletedTodoIndex === -1){
      throw new NotFoundException(`The Todo with ID ${id} was not found!`);
    }

    this.todos.splice(deletedTodoIndex, 1);
  }

  public updatedTodoById(id: string, status: string): Todo{
    const updatedTodoIndex = this.todos.findIndex( todoItem => todoItem.id === id );

    if(updatedTodoIndex === -1){
      throw new NotFoundException(`The Todo with ID ${id} was not found!`);
    }

    this.todos[updatedTodoIndex] = {
      ...this.todos[updatedTodoIndex],
      status: TodoStatus[status]
    }
    return this.todos[updatedTodoIndex];
  }
  

}
