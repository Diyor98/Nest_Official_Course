import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { Connection } from 'typeorm';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

class MockCoffeeService {} // used as an example for useValue



@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
    controllers: [CoffeesController],
    providers: [CoffeesService,
                
        { provide: COFFEE_BRANDS, useFactory: async (connection: Connection): Promise<string[]> =>  {
            // const coffeeBrands = await connection.query('SELECT * ...');
            const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe', 'hello']);
            console.log('Hello instantiation');
            return coffeeBrands;
        },}],
    exports: [CoffeesService]
})
export class CoffeesModule {}


// { provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe']}

/*
    { provide: <ClassName>, useClass: <ClassName>}
    { provide: <ClassName>, useValue: <Instance of a mock class>}
    { provide: <String to be Injected (@Inject)>, useValue: <Array of values>}
*/

/*
class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

{   provide: ConfigService,
    useClass: process.env.NODE_ENV === 'development' ? DevelopmentConfigService : ProductionConfigService
},
*/


/* 

useFactory

@Injectable()
export class CoffeeBrandsFactory {
    create() {
         ... do something 
        return ['buddy brew', 'nescafe'];
    }
}

providers: [
    CoffeeBrandFactory,
    { provide: COFFEE_BRANDS, useFactory: (brandFactory: CoffeeBrandFactory) => brandFactory.create() , inject: [CoffeeBrandFactory]}
]

*/