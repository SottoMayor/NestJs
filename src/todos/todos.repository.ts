import { Entity, EntityRepository, Repository } from "typeorm";
import { Todo } from './todos.entity';
import { TodoStatus } from "./todos-status.enum";

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo>{
    public async createTodo(CreateTodo): Promise<Todo>{
        const { title, text } = CreateTodo;
    
        const newTodo = await this.create({
          title: title, 
          text: text, 
          status:TodoStatus.OPEN,
        })
    
        await this.save(newTodo);
        return newTodo;
      }
}