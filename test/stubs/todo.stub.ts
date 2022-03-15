import { Users } from "src/Entity/user.entity"
import { Task, TaskPriority,  TaskStatus } from "../../src/Entity/task.entity"


export const taskStub  = (): Task => {

   return  {

        "id": 1,

        "title": "ring",

        "description": "String",

        "priority" : TaskPriority.LOW,

        "status": TaskStatus.INPROGRESS,

        "userId": 1,

        "user": new Users
    }

}