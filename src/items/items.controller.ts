import { Controller, Get, Post, Put, Param, Body, Delete, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.entity';
import { Roles } from 'src/common/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN','USER')
    @Get()
    async findAll() {
        return await this.itemsService.findAll();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Post()
    async create(@Body() itemData: Item) {
        return await this.itemsService.create(itemData);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Delete(':id')
    async delete(@Param('id') id: number,) {
        return await this.itemsService.delete(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Put(':id/updatePrice')
    async updatePrice(@Param('id') id: number, @Body() body: any) {
        return await this.itemsService.updatePrice(id, body.price);
    }

}
