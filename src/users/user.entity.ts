import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
