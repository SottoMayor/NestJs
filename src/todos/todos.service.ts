import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoStatus } from './todos-status.enum';
import { CreateTodoDto } from './DTO/create-todos.dto';
import { GetTodosFilterDto } from './DTO/get-todos-filter.dto';
import { TodoRepository } from './todos.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todos.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoRepository)
    private TodoRepository: TodoRepository
    ){}

  public getTodos(GetTodosFilterDto: GetTodosFilterDto, user: User): Promise<Todo[]>{
    return this.TodoRepository.getTodos(GetTodosFilterDto, user);
  }
  

  public createTodo(CreateTodo: CreateTodoDto, user: User): Promise<Todo>{
    return this.TodoRepository.createTodo(CreateTodo, user)
  }

  public async getTodoById(id: string, user: User): Promise<Todo>{
    const todoFound = await this.TodoRepository.findOne({id: id, user: user});
    
    if(!todoFound){
      throw new NotFoundException(`The todo with ID ${id} was not found!`);
    }

    return todoFound;
  }

  public async deleteTodoById(id: string, user: User): Promise<void>{
    const foundTodo = await this.TodoRepository.delete({ id, user });

    if(foundTodo.affected === 0){
      throw new NotFoundException(`The Todo with ID ${id} was not found!`);
    }

  }

  public async updatedTodoById(id: string, status: TodoStatus, user: User): Promise<Todo>{
    const foundTodo = await this.getTodoById(id, user);
    foundTodo.status = status;
    await this.TodoRepository.save(foundTodo);
    return foundTodo;
  }

  
}
