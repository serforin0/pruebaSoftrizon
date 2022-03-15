import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from '../DTO/create-task.dto';
import { Task, TaskPriority, TaskStatus } from '../Entity/task.entity';
import { TodoService } from './todo.service';
import { TaskStatusValidation } from "../pipes/TaskStatusValidation.pipe";
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/user.decorator';
import { Users } from '../Entity/user.entity';

@Controller('todos')
@UseGuards(AuthGuard())
export default class TodoController {
    static getTaskById: any;

    constructor(private todoService: TodoService) {}

    @Get()
    getAllTodos(
      @User() user: Users
    ) {
      // console.log(this.todoService.getAllTodos());
  
      return this.todoService.getAllTask(user);
    }

    @Get(':id')
     getTaskById(@Param('id') id: number) {
        return this.todoService.getTaskById(id);
    }

    @Post()
    createNewTask(@Body(ValidationPipe) data: CreateTaskDto, @User() user: Users) {

        return this.todoService.createNewTask(data, user);
    }

    @Patch(':id')
    updateTask(
        @Body('status', TaskStatusValidation) status: TaskStatus,
        @Param('id') id: number, 
        @User() user: Users
    ) {
        return this.todoService.updateTask(id, status, user);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: number, @User() user: Users) {
        return this.todoService.deleteTask(id, user);
    }

    
}
