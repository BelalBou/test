// src/products/products.controller.ts
import {
  Controller,
  Get,
  Body,
  Request,
  UseGuards,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProductDto } from '../auth/dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('me')
  async createForVendor(@Request() req, @Body() body: CreateProductDto) {
    return this.productsService.createForVendor(req.user.sub, body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateProduct(
    @Request() req,
    @Param('id') id: string,
    @Body() body: Partial<CreateProductDto>,
  ) {
    return this.productsService.updateProduct(req.user.sub, +id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteProduct(@Request() req, @Param('id') id: string) {
    return this.productsService.deleteProduct(req.user.sub, +id);
  }
}
