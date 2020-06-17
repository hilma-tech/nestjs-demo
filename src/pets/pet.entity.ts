import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, JoinTable, ManyToMany } from 'typeorm';

import { User } from "../users/user.entity";
import { Item } from "src/items/item.entity";
import { Gender } from '../common/enums/gender.enum';

@Entity()
export class Pet {
    @PrimaryGeneratedColumn('uuid')
    id?: string; 

    @Column()
    name: string;

    @Column({ default: Gender.Male })
    gender: Gender;

    @Column()
    image: string;

    @OneToOne(type => User, user => user.pet)
    @JoinColumn()
    user?: string;

    @ManyToMany(type => Item)
    @JoinTable()
    items?: Item[];
}
