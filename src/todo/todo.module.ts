import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { Task } from '../Entity/task.entity';
import { UsersModule } from '../users/users.module';
import TodoController  from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [
    
    TypeOrmModule.forFeature([Task]),
    UsersModule
  ],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
