import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "src/Entity/task.entity";


export class TaskStatusValidation implements PipeTransform {
  
  
    readonly allowedStatus = [TaskStatus.OPEN, TaskStatus.INPROGRESS, TaskStatus.COMPLETE];

    transform(value: any, metadata: ArgumentMetadata) {
        value = value.toUpperCase();

        if(!this.isStatusValid(value)) {
            throw new BadRequestException('is an invalid status.');
        }
        return value;
        
    }

    private isStatusValid(status: any): boolean {

        const index = this.allowedStatus.indexOf(status);
        return index !== -1;
    }
    
}