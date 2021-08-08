import { Todo } from "src/todos/todos.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @OneToMany(_type => Todo, todo => todo.user, { eager: true })
    todos: Todo[]

}