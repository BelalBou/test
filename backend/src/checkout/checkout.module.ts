import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [CheckoutController],
})
export class CheckoutModule {}
