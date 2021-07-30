import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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
    
}