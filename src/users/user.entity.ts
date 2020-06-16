import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Pet } from "../pets/pet.entity";
import { Gender } from '../common/enum/gender.enum';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column()
    name: string;
    @Column({ type: "enum", default: Gender.Male, enum: Gender })
    gender?: Gender;

    @OneToOne(type => Pet, pet => pet.user, {cascade: true})
    pet: Pet;
}