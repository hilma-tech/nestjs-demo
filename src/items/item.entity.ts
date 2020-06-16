import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    image: string;

    @Column()
    stock: number;
}
