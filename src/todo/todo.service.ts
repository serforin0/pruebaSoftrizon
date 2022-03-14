import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from 'src/DTO/create-task.dto';
import { Task, TaskStatus, TaskPriority } from 'src/Entity/task.entity';
import { Users } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {

    constructor(@InjectRepository(Task) private repo: Repository<Task>) {
        
    }

    async getAllTask(user: Users) {
        const query = await this.repo.createQueryBuilder('todo');
        query.where(`todo.userId = :userId`, {userId: user.id});

        try{
            return await query.getMany();
        }catch(err){
            throw new NotFoundException('no Task found');
        }
    }

    async getTaskById(id: number) {
        return this.repo.findOne({ id})
    }

    async createNewTask(createTaskDTO: CreateTaskDto, user: Users) {
        const task = new Task();
        const { title, description } = createTaskDTO
        task.title = title;
        task.description = description;
        task.priority = TaskPriority.LOW;
        task.status = TaskStatus.OPEN;
        task.userId = user.id;

        this.repo.create(task);

        try {
            return await this.repo.save(task);

        }catch (error) {
            throw new InternalServerErrorException('Something wne wrong, task not created');
        }
        
    }

    async updateTask(id: number, status: TaskStatus, user: Users) {
       
        try{
            await this.repo.update({id, userId: user.id}, {status});
            
            return this.repo.findOne({id});
        }catch(error) {
            throw new InternalServerErrorException('Error went wrong');
        }
        
    }

    async deleteTask(id: number, user: Users) {
        const result = await this.repo.delete({id, userId: user.id});

        if(result.affected == 0){
            throw new NotFoundException('Todo Not Deleted');
        } else {
            return { sucess: true};
        }
        // try{
        //     return await this.repo.delete({id});
        // }catch(error) {
        //     throw new InternalServerErrorException('Error went wrong');
        // }
        
    }


}
