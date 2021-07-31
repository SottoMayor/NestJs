import { Entity, EntityRepository, Repository } from "typeorm";
import { Todo } from './todos.entity';
import { TodoStatus } from "./todos-status.enum";

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo>{

  public async getTodos(TodosFilterDto): Promise<Todo[]>{
    const { status, search } = TodosFilterDto;

    const query = this.createQueryBuilder('todo');

    if(status){
      query.andWhere('todo.status = :status', { status })
    }

    if(search){
      query.andWhere('LOWER(todo.title) LIKE LOWER(:search) OR LOWER(todo.text) LIKE LOWER(:search)', 
      { search: `%${search}%` })
    }
    
    const todos = await query.getMany();

    return todos;

  }

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