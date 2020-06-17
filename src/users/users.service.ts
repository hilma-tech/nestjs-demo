import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as base64 from 'base-64';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';

const roleAccessConfig = require('../../role-access.config.json');

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
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
        return {
            ...user,
            access_token: this.jwtService.sign(payload)
        };
    }

    async create(body: User) {
        const { password, ...rest } = body;
        console.log({ body });
        const hashed = bcrypt.hashSync(password, 10);
        return this.usersRepository.save({ ...rest, password: hashed });
    }

    findOne(username: string): Promise<User> {
        return this.usersRepository.findOne({ username });
    }

    async update(id: string, body: User) {
        return this.usersRepository.update(id, body);
    }

    async getUserRole(username: string): Promise<string> {
        const user = await this.findOne(username);
        const role = user.role;
        return role;
    }
}
