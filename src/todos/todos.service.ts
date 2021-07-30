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

  // public createTodo(todo: Todo): Todo[]{
  //   this.todos.push(todo);
  //   return this.getAllTodos();
  // }

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


}
