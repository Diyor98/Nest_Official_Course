import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  SetMetadata,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';


@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeService: CoffeesService,
              @Inject(REQUEST) private readonly request: Request) {
    console.log('CoffeesController created');
  }

  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Public()
  @Get()
  async findAll(@Protocol('https') protocol: string,  @Query() paginationQuery: PaginationQueryDto) {
    console.log(protocol);
    // await new Promise(resolve => setTimeout(resolve, 5000));
    // const { limit, offset } = paginationQuery;
    return this.coffeService.findAll(paginationQuery);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
      console.log(id);
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
