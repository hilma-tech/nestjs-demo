import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import * as base64 from 'base-64';
import * as bcrypt from 'bcrypt';

const roleAccessConfig = require('../../role-access.config.json');

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
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

    async create(body) {
        const { password, ...rest } = body;
        console.log({body});
        const hashed = bcrypt.hashSync(password, 10);
        return this.usersService.create({ ...rest, password: hashed });
    }
    async findOne(username) {
        return this.usersService.findOne(username);
    }

    async update(id: string, body: User) {
        return this.usersService.update(id, body);
    }
}
