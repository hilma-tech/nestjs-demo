import { JwtService } from '@nestjs/jwt';
import { Repository, ObjectLiteral, DeepPartial } from 'typeorm';
import * as base64 from 'base-64';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';

const roleAccessConfig = require('../../role-access.config.json');

export abstract class UserService<CustomUser extends User> {
	constructor(
		private readonly usersRepository: Repository<CustomUser>,
		private readonly jwtService: JwtService,
	) { }

	async validateUser(username: string, pass: string) {
		const user = await this.findOne(username);
		if (user && bcrypt.compareSync(pass, user.password)) {
			const { password, ...result } = user;
			const { comps: a, defaultHomePage: b } = roleAccessConfig[result.role];
			const klo = base64.encode(JSON.stringify({ a, b }));
			return { ...result, klo };
		}
		return null;
	}

	async login(user: any) {
		const payload = { username: user.username, sub: user.userId };
		return { ...user, access_token: this.jwtService.sign(payload) };
	}

	create(body: DeepPartial<CustomUser>) {
		const { password, ...rest } = body;
		const hashed = bcrypt.hashSync(password, 10);
		return this.usersRepository.save({ ...rest, password: hashed });
	}

	findOne(username: string) {
		return this.usersRepository.findOne({ where: { username } });
	}

	async getUserRole(username: string) {
		const user = await this.findOne(username);
		const role = user.role;
		return role as string;
	}
}
