import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PetsController } from './pets.controller';
import { Pet } from './pet.entity';
import { PetsService } from './pets.service';

@Module({
    imports: [TypeOrmModule.forFeature([Pet])],
    providers: [PetsService],
    controllers: [PetsController],
})
export class PetsModule {}
