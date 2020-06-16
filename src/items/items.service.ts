import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private readonly itemsRepository: Repository<Item>,
    ) { }

    async create(body) {
        return await this.itemsRepository.save(body)
    }

    async findAll() {
        return await this.itemsRepository.find();
    }

    async updatePrice(id: string, price: number) {
        return await this.itemsRepository.update(id, {price});
    }

}
