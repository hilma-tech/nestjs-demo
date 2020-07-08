import { Entity, Column, OneToOne } from 'typeorm';

import { Pet } from "../pets/pet.entity";
import { Gender } from '../common/enums/gender.enum';
import { User } from 'src/users/user.entity';

@Entity()
export class Customer extends User {
	@Column()
	name: string;

	@Column({ type: "enum", default: Gender.Female, enum: Gender })
	gender?: Gender;

	@OneToOne(type => Pet, pet => pet.user, { cascade: true })
	pet?: Pet;
}