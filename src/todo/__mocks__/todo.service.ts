import { taskStub } from "test/stubs/todo.stub";


console.log("hola aqui estoy");
export default function TaskService (){ 
    
    return {
       testData: jest.fn().mockReturnValue({
                
            getTaskById: jest.fn().mockReturnValue(taskStub()),
            getAllTask: jest.fn().mockReturnValue([taskStub()]),
            createNewTask: jest.fn().mockReturnValue(taskStub()),
            updateTask: jest.fn().mockReturnValue(taskStub())
        })
    }

}
