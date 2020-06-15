import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'z10mz10m',
      database: 'framework',
      entities: [User],
      synchronize: true,
    }),
  ],
})

export class AppModule {
  constructor(private readonly connection: Connection) {}
}
