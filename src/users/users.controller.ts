import { Controller, Get, Put, Post, Req, Param, Body } from '@nestjs/common';
import { Request } from 'express';

@Controller('users')
export class UsersController {

    @Get(':id')
    findOne(@Req() request: Request, @Param() params): string {
        console.log("Param", params.id);
        return `This action returns a #${params.id} user`;
    }

    @Post()
    create(@Body() userData: UserData): object {
        return userData;
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() userData: UserData): string {
        return `This action updates a #${id} user`;
    }
}


class UserData {
    name: string;
    gender?: Gender = Gender.Male;
    username: string;
    password: string;
}

enum Gender { Male, Female };