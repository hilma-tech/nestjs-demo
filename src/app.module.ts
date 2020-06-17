import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(), UsersModule, PetsModule, ItemsModule, AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/build'),
    }),
  ]
})
export class AppModule { }