import { Controller, Get, Patch, Req, UseGuards, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: { sub: number };
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ✅ Obtenir les infos du profil connecté
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;
    return this.usersService.findById(userId);
  }

  // ✅ Modifier les infos du profil
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateProfile(
    @Req() req: AuthenticatedRequest,
    @Body() body: { firstname?: string; lastname?: string; email?: string },
  ) {
    const userId = req.user.sub;
    await this.usersService.update(userId, body);
    return { message: 'Profil mis à jour' };
  }

  // ✅ Passer le rôle à "vendor"
  @Patch('vendor')
  @UseGuards(JwtAuthGuard)
  async becomeVendor(@Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;
    const user = await this.usersService.becomeVendor(userId);
    return { message: 'Utilisateur mis à jour', user };
  }

  @Get('test')
  test() {
    return { message: 'OK' };
  }
}
