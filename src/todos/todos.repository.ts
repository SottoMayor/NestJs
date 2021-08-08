import { Entity, EntityRepository, Repository } from "typeorm";
import { Todo } from './todos.entity';
import { TodoStatus } from "./todos-status.enum";
import { CreateTodoDto } from "./DTO/create-todos.dto";
import { User } from "src/auth/user.entity";

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo>{

  public async getTodos(TodosFilterDto, user: User): Promise<Todo[]>{
    const { status, search } = TodosFilterDto;

    const query = this.createQueryBuilder('todo');

    query.where({ user: user });

    if(status){
      query.andWhere('todo.status = :status', { status: status })
    }

    if(search){
      query.andWhere('( LOWER(todo.title) LIKE LOWER(:search) OR LOWER(todo.text) LIKE LOWER(:search) )', 
      { search: `%${search}%` })
    }
    
    const todos = await query.getMany();

    return todos;

  }

    public async createTodo(CreateTodo: CreateTodoDto, user: User): Promise<Todo>{
        const { title, text } = CreateTodo;
    
        const newTodo = await this.create({
          title: title,
          text: text, 
          status: TodoStatus.OPEN,
          user: user
        })
    
        await this.save(newTodo);
        return newTodo;
      }
}