import { Test, TestingModule } from '@nestjs/testing';
import { Task } from "../src/Entity/task.entity";

import  TodoController from "../src/todo/todo.controller"
import { TodoService } from "../src/todo/todo.service"
import { taskStub } from "./stubs/todo.stub";

// jest.mock('src/todo/__mocks__/todo.service');
describe('TodoController', () => {

    let taskController: TodoController;
    let taskService: TodoService;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [TodoController],
            providers: [TodoService]
        }).compile();

        // taskController = moduleFixture.get<TodoController>(TodoController);
        // taskService = moduleFixture.get<TodoService>(TodoService);
        
    });

    describe('getTaskById', () => {
        describe('when getTask is called', () => {
            let task: Task;

            console.log(TodoController.getTaskById(1));
            beforeEach(async () => {
                task = await taskController.getTaskById(1)
            })

            test('then it should taskService', () => {
                expect(taskService.getTaskById).toBeCalledWith(1);
            })
        })
    })
})