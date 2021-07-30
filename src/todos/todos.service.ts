import { Injectable } from '@nestjs/common';

@Injectable()
export class TodosService {
  private todos = [];

  public getAllTodos() {
    return this.todos;
  }
}
