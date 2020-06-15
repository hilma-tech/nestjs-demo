import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import {Pet} from "../pets/pet.entity";

enum Gender { Male, Female };

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({ default: Gender.Male })
    gender: Gender;

    @OneToOne(type => Pet, pet => pet.userId)
    pet: Pet;

}
