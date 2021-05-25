import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeService: CoffeesService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    // const { limit, offset } = paginationQuery;
    return this.coffeService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
      console.log(typeof id);
      return this.coffeService.findOne(''+id);
    // return `This action returns ${id} coffee`;
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
      console.log(createCoffeeDto instanceof CreateCoffeeDto);
      return this.coffeService.create(createCoffeeDto);
    // return body;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
      await this.coffeService.update(id, updateCoffeeDto);
    // return `This function updates ${id} coffee`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
      this.coffeService.remove(id);
    // return `This function remove ${id} coffee`;
  }
}
