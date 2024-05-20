import { Body, Controller, Delete, Get, Param, Post, Put, Query, HttpStatus, HttpCode } from '@nestjs/common';
import internal from 'stream';

interface ProductInfo{
    productId: number;
    name: string;
    price: number; // it's an example, in the real world the price shouldn't be sent by the client
    brand: string;
}

@Controller('products')
export class ProductsController {
    @Get(':productId') // here no longer 'products' in @Get('products/:productId') because the @Controller('products') already is giving it to the route
    getOne(@Param('productId') productId: string){ // other option @Param() {productId}: ProductInfo
        return {
            message: `product ${productId}`,
        };
    }

    @Get()
    getFilter(@Query('price') price = 100, @Query('productId') productId = 20, @Query('brand') brand: string){ //  other option: @Query() { price, productId }: ProductInfo
        return {
            message: `products: price: ${price} productId: ${productId} brand ${brand}`,
        }; 
    }

    @Post()
    create(@Body() payload: any){ // other option: @Body() payload: ProductInfo
        return {
            message: 'product created',
            payload,
        };
    }

    @Put(':productId')
    update(@Param() {productId}: ProductInfo, @Body() payload: ProductInfo){
        return {
            productId,
            payload,
        };
    }

    @Delete(':productId')
    delete(@Param() {productId}: ProductInfo){
        return {
            message: `product ${productId} deleted`,
        };
    }
}