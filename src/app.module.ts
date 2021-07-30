import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TodosModule, 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'kesavan.db.elephantsql.com',
      port: 5432,
      username: 'axcdeupn',
      password: 'L21Ukz076jBggfV4eaY18xEQj-QkjPxv',
      database: 'axcdeupn',
      autoLoadEntities: true,
      synchronize: true
    }),],
})
export class AppModule {}
