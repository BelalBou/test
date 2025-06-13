// users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { VendorsModule } from '../vendors/vendors.module'; // 👈
import { UsersController } from './users.controller'; // 👈 à ajouter

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    VendorsModule, // 👈 ajoute ce module
  ],
  providers: [UsersService],
  controllers: [UsersController], // 👈 à ajouter
  exports: [UsersService],
})
export class UsersModule {}
