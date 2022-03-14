import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./user.entity";

@Entity('todos')
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: String;

    @Column()
    description: String;

    @Column()
    priority: TaskPriority;

    @Column()
    status: TaskStatus;

    @ManyToOne( type => Users, Users => Users.task)
    user: Users;

    @Column()
    userId: number;

}

export enum TaskStatus {
    OPEN = 'OPEN',
    INPROGRESS = 'INPROGRESS',
    COMPLETE = 'COMPLETE'
}

export enum TaskPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}