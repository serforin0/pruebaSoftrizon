import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskPriority } from "src/Entity/task.entity";


export class TaskPriorityValidation implements PipeTransform {
  
  
    readonly allowedStatus = [TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH];

    transform(value: any, metadata: ArgumentMetadata) {
        value = value.toUpperCase();

        if(!this.isStatusValid(value)) {
            throw new BadRequestException('is an invalid priority.');
        }
        return value;
        
    }

    private isStatusValid(status: any): boolean {

        const index = this.allowedStatus.indexOf(status);
        return index !== -1;
    }
    
}