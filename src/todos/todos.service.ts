import { Injectable } from '@nestjs/common';
import { Todo } from './todos.model';
import { TodoStatus } from './todos.model';
import { v4 as uuid } from 'uuid'

@Injectable()
export class TodosService {
  private todos: Todo[] = [];

  public getAllTodos(): Todo[] {
    return this.todos;
  }

  // public createTodo(todo: Todo): Todo[]{
  //   this.todos.push(todo);
  //   return this.getAllTodos();
  // }

  public createTodo(title: string, text: string): Todo{
    // Creating the todo
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


}
