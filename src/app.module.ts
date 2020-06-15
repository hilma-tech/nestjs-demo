import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { PetsController } from './pets/pets.controller';
import { PetsService } from './pets/pets.service';
import { PetsModule } from './pets/pets.module';
import { ItemsController } from './items/items.controller';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [UsersModule, PetsModule, ItemsModule],
  controllers: [AppController, UsersController, PetsController, ItemsController],
  providers: [AppService, PetsService],
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
