import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), CoffeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
