import { Controller, Get, Put, Post, Param, Body } from '@nestjs/common';
// import { Request } from 'express';
import { UsersService } from './users.service'
import { CreateUserDTO } from './dto';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Post()
    create(@Body() userData: CreateUserDTO): object {
        return userData;
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() userData: CreateUserDTO): string {
        return `This action updates a #${id} user`;
    }
}
