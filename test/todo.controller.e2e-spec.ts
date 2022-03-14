import { Test, TestingModule } from '@nestjs/testing';
import { Task } from "src/Entity/task.entity";

import { TodoController } from "src/todo/todo.controller"
import { TodoService } from "src/todo/todo.service"
import { taskStub } from "./stubs/todo.stub";

jest.mock('src/todo/todo.service');
describe('TodoController', () => {

    let taskController: TodoController;
    let taskService: TodoService;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [TodoController],
            providers: [TodoService]
        }).compile();

        taskController = moduleFixture.get<TodoController>(TodoController);
        taskService = moduleFixture.get<TodoService>(TodoService);
        
    });

    describe('getTaskById', () => {
        describe('when getTask is called', () => {
            let task: Task;

            beforeEach(async () => {
                task = await taskController.getTaskById(taskStub().id)
            })

            test('then it should taskService', () => {
                expect(taskService.getTaskById).toBeCalledWith(taskStub().id);
            })
        })
    })
})