import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [{
        id: 1,
        name: 'Shipwreck Roast',
        brand: 'Buddy Brew',
        flavors: ['chocolate', 'vanilla'],
    },
];

    findAll() {
        return this.coffees;
    }
    
    findOne(id: string) {
        const coffee = this.coffees.find(coffee => coffee.id === +id);
        if (!coffee) {
            throw new NotFoundException(`Coffee with #${id} not found`);
        }
        return coffee;
    }

    create(createCoffeeDto: any) {
        this.coffees.push(createCoffeeDto);
        return createCoffeeDto;
    }

    update(id: string, updateCoffeDto: any) {
        const existing = this.findOne(id);
        if (existing) {

        }
    }

    remove(id: string ) {
        const coffeeIndex = this.coffees.findIndex(coffee => coffee.id === +id);
        if (coffeeIndex >= 0) {
            return this.coffees.splice(coffeeIndex,1);
        }
    }
}
