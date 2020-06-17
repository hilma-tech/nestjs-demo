import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async create(body) {
    return await this.usersRepository.save(body)
  }

  findOne(username: string): Promise<User> {
    return this.usersRepository.findOne({ username });
  }

  async update(id: string, body: User) {
    return await this.usersRepository.update(id, body);
  }

  async getUserRole(username: string): Promise<string> {
    const user = await this.findOne(username);
    const role = user.role;
    return role;
  }
}
