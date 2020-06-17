import { Controller, Get, Put, Post, Param, Body, UseGuards, Request } from '@nestjs/common';
import { User } from './user.entity';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseRoles } from 'src/common/use-roles.decorator';


@Controller('users')
export class UsersController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Get('createBasicData')
    async createBasicData() {
        let newUser = await this.authService.create({ username: "Yona123", password: "123123", name: "Yona Ben Reuven", pet: { name: "Rivka", gender: "Female", image: "https://www.howrse.co.il/media/equideo/image/chevaux/adulte/americain/normal/300/pie-tb-bai.png" } });
        return newUser;
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findOne(@Request() req) {
        let user = await this.authService.findOne(req.user.username);
        if (!user) return "User Was Not Found."
        return user;
    }

    @UseRoles('ADMIN')
    @Post()
    async create(@Body() userData: User) {
        let newUser = await this.authService.create(userData);
        return newUser;
    }

    @UseRoles('ADMIN', 'USER')
    @Put(':id')
    async update(@Param('id') id: string, @Body() userData: User) {
        let updatedUser = await this.authService.update(id, userData);
        console.log("updated", updatedUser)
        return `This action updates a #${id} user`;
    }
}
