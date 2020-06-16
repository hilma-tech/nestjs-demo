import { Controller, Get, Put, Post, Param, Body } from '@nestjs/common';
// import { Request } from 'express';
import { UsersService } from './users.service'
import { User } from './user.entity';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('createBasicData')
    async createBasicData() {
        let newUser = await this.usersService.create({ username: "Yona123", password: "123123", name: "Yona Ben Reuven", pet: { name: "Rivka", gender: "Female", image: "https://www.howrse.co.il/media/equideo/image/chevaux/adulte/americain/normal/300/pie-tb-bai.png" } });
        return newUser;
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        let user = await this.usersService.findOne(id);
        if (!user) return "User Was Not Found."
        return user;
    }

    @Post()
    async create(@Body() userData: User) {
        let newUser = await this.usersService.create(userData);
        return newUser;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() userData: User) {
        let updatedUser = await this.usersService.update(id, userData);
        console.log("updated", updatedUser)
        return `This action updates a #${id} user`;
    }
}
