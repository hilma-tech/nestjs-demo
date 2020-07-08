import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { ItemsModule } from './items/items.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(), UsersModule, PetsModule, ItemsModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'client/web-build'),
        })
    ]
})
export class AppModule { }
