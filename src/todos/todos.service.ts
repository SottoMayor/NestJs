import { Injectable } from '@nestjs/common';
import { Todo } from './todos.model';
import { TodoStatus } from './todos.model';
import { v4 as uuid } from 'uuid'
import { CreateTodoDto } from './DTO/create-todos.dto';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];

  public getAllTodos(): Todo[] {
    return this.todos;
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
    return this.todos.find( todoItem => todoItem.id === id)
  }

  public deleteTodoById(id: string): void{
    const deletedTodoIndex = this.todos.findIndex(todoItem => todoItem.id === id);
    this.todos.splice(deletedTodoIndex, 1);
  }

  public updatedTodoById(id: string, status: string): Todo{
    const updatedTodoIndex = this.todos.findIndex( todoItem => todoItem.id === id );
    this.todos[updatedTodoIndex] = {
      ...this.todos[updatedTodoIndex],
      status: TodoStatus[status]
    }
    return this.todos[updatedTodoIndex];
  }
  

}
