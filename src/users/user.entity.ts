import { Column, PrimaryGeneratedColumn, ObjectLiteral } from 'typeorm';

import { Roles } from '../common/enums/roles.enum';

export abstract class User implements ObjectLiteral {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column({ unique: true })
	username?: string;

	@Column()
	password?: string;

	@Column({ default: Roles.USER })
	role?: Roles
}