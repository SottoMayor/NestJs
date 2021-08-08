import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TodosModule, 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'kesavan.db.elephantsql.com',
      port: 5432,
      username: 'slljizru',
      password: 'QiidfZKDr91wUkSp4dMxxa822DcZxYWm',
      database: 'slljizru',
      autoLoadEntities: true,
      synchronize: true
    }), AuthModule,],
})
export class AppModule {}
