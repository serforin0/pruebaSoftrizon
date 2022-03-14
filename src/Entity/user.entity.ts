import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcryptjs";
import { Task } from "./task.entity";

@Entity('users')
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

   

    @OneToMany(type => Task, task => task.user)
    task: Task[]   

   

}