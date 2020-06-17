import { Controller, Get, Put, Post, Param, Body, Request } from '@nestjs/common';

import { User } from './user.entity';
import { UsersService } from './users.service';
import { UseRoles } from '../common/decorators/use-roles.decorator';
import { Gender } from '../common/enums/gender.enum';
import { UseLocalAuth } from 'src/common/decorators/use-local-auth.decorator';
import { UseJwtAuth } from 'src/common/decorators/use-jwt-auth.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseLocalAuth()
    @Post('login')
    async login(@Request() req) {
        return this.usersService.login(req.user);
    }

    @Get('createBasicData')
    async createBasicData() {
        let newUser = await this.usersService.create({ username: "Yona123", password: "123123", name: "Yona Ben Reuven", pet: { name: "Rivka", gender: Gender.Female, image: "https://www.howrse.co.il/media/equideo/image/chevaux/adulte/americain/normal/300/pie-tb-bai.png" } });
        return newUser;
    }

    @UseJwtAuth()
    @Get()
    async findOne(@Request() req) {
        let user = await this.usersService.findOne(req.user.username);
        if (!user) return "User Was Not Found."
        return user;
    }

    @UseRoles('ADMIN')
    @Post()
    async create(@Body() userData: User) {
        let newUser = await this.usersService.create(userData);
        return newUser;
    }

    @UseRoles('ADMIN', 'USER')
    @Put(':id')
    async update(@Param('id') id: string, @Body() userData: User) {
        let updatedUser = await this.usersService.update(id, userData);
        console.log("updated", updatedUser)
        return `This action updates a #${id} user`;
    }
}
