import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
import {PositiveIntegerPipe} from '../pipes/positive-integer.pipe';
import { ProductsService } from './../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('all-products')   
  getAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe, PositiveIntegerPipe) id: number){ // the PositiveIntegerPipe would'n be reached
    return this.productsService.findOne(id);
  }

  @Get()
  getFilter( // In process
    @Query('price', ParseIntPipe) price: number = 100,
    @Query('id', ParseIntPipe) id: number = 20,
    @Query('brand') brand: string,
  ) {
    return {
      message: `products: price: ${price} id: ${id} brand: ${brand}`,
    };
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) // `whitelist: true` - Ensures only properties defined in `CreateProductDto` are allowed in the request body
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateProductDto) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  }
}