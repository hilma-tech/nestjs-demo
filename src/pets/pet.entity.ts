import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, JoinTable, ManyToMany } from 'typeorm';
import { User } from "../users/user.entity";
import { Item } from "../items/item.entity";

enum Gender { Male, Female };

@Entity()
export class Pet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: Gender.Male })
    gender: Gender;

    @Column()
    image: string;

    @OneToOne(type => User, user => user.pet)
    @JoinColumn()
    userId: string;

    @ManyToMany(type => Item)
    @JoinTable()
    items: Item[];

}
