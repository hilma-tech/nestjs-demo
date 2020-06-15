import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PetsController } from './pets/pets.controller';
import { PetsService } from './pets/pets.service';
import { PetsModule } from './pets/pets.module';
import { ItemsController } from './items/items.controller';
import { ItemsModule } from './items/items.module';
import { ItemsService } from './items/items.service';
import { UsersService } from './users/users.service';

@Module({
  imports: [UsersModule, PetsModule, ItemsModule],
  controllers: [AppController, UsersController, PetsController, ItemsController],
  providers: [AppService, PetsService, ItemsService, UsersService],
})

@Module({
  imports: [TypeOrmModule.forRoot()],
})

export class AppModule {
}
