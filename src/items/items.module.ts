import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsController } from './items.controller';
import { Item } from './item.entity';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item, User])],
  providers: [ItemsService, UsersService],
  controllers: [ItemsController],
})

export class ItemsModule {}
