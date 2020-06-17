import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

import { Pet } from "../pets/pet.entity";
import { Gender } from '../common/enums/gender.enum';
import { Roles } from '../common/enums/roles.enum';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({ default: Roles.USER })
    role?: Roles

    @Column({ type: "enum", default: Gender.Male, enum: Gender })
    gender?: Gender;

    @OneToOne(type => Pet, pet => pet.user, { cascade: true })
    pet: Pet;
}