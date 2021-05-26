import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { typeOrmConfig } from './config/typeorm.config';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), CoffeesModule, CoffeeRatingModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
