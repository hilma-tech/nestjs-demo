import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, PetsModule, ItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
