import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosController } from './todos.controller';
import { TodoRepository } from './todos.repository';
import { TodosService } from './todos.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([TodoRepository])
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
