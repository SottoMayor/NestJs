import { User } from "src/auth/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TodoStatus } from './todos-status.enum'

@Entity()
export class Todo{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;
    
    @Column()
    text: string;

    @Column()
    status: TodoStatus
    
    @ManyToOne(_type => User, user => user.todos, { eager: false })
    user: User

}