import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, PetsModule, ItemsModule],
})
export class AppModule { }