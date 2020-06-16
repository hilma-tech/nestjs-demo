import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.entity';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }

    @Get('createBasicData')
    async createBasicData() {
        let items = await this.itemsService.create([
            { name: "Carrot", stock: 5, image: "https://cdn130.picsart.com/318760465284211.png?type=webp&to=min&r=640", price: 10 },
            { name: "Apple", stock: 2, image: "https://cdn140.picsart.com/318760885246211.png?type=webp&to=min&r=640", price: 15 },
            { name: "Golden Apple", stock: 1, image: "https://www.howrse.com/media/equideo/image/produits/200/pomme-or.png?32678593", price: 50 }
        ]);
        return items;
    }

    @Get()
    async findAll() {
        return await this.itemsService.findAll();
    }

    @Post()
    async create(@Body() itemData: Item) {
        return await this.itemsService.create(itemData);
    }

    @Put(':id/updatePrice')
    async updatePrice(@Param('id') id: string, @Body() price: number) {
        return await this.itemsService.updatePrice(id, price);
    }

}
