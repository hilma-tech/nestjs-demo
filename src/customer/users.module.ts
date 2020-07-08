import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UsersController } from './users.controller';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '../common/constants';
import { LocalStrategy } from '../common/strategies/local.strategy';
import { JwtStrategy } from '../common/strategies/jwt.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '100min' },
        })
    ],
    providers: [UsersService, LocalStrategy, JwtStrategy],
    controllers: [UsersController],
    exports: [
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '100min' },
        })
    ]
})
export class UsersModule { }
