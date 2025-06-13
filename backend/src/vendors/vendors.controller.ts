import {
  Controller,
  Get,
  Patch,
  Post,
  Body,
  UseGuards,
  Request,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { Vendor } from './vendor.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Get()
  findAll(): Promise<Vendor[]> {
    return this.vendorsService.findAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMyVendor(@Request() req) {
    return this.vendorsService.findByUserId(req.user.sub);
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async updateMyVendor(@Request() req, @Body() data: Partial<Vendor>) {
    return this.vendorsService.updateByUserId(req.user.sub, data);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Vendor | null> {
    return this.vendorsService.findOne(id);
  }

  @Post()
  create(@Body() vendorData: Partial<Vendor>) {
    return this.vendorsService.create(vendorData);
  }
}
