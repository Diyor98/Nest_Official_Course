import { Injectable, Module, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { Connection } from 'typeorm';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import coffeesConfig from './config/coffees.config';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

class MockCoffeeService {} // used as an example for useValue



@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event]), ConfigModule.forFeature(coffeesConfig)],
    controllers: [CoffeesController],
    providers: [CoffeesService,
                
        { provide: COFFEE_BRANDS, useFactory: () => ['buddy brew', 'nescafe', 'hello'], scope: Scope.TRANSIENT}],
    exports: [CoffeesService]
})
export class CoffeesModule {}


// { provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe']}

// useFactory uses functions to pass valuee to provder (functions can be async)

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