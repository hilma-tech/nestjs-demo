import { Controller, Post } from '@nestjs/common';
import { PetsService } from './pets.service';
import { Item } from 'src/items/item.entity';

@Controller('pets')
export class PetsController {
    constructor(private readonly petsService: PetsService) { }

    // @Put(':id/editPrice')
    // async update(@Param('id') id: string, @Body() price: number) {
    //     return await this.petsService.update(id, { price });
    // }

}
