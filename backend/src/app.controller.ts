import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  @Get('*')
  serveAngularApp(@Res() res: Response): void {
    // Sert l'application Angular pour toutes les routes qui ne sont pas des routes API
    res.sendFile(join(__dirname, '..', 'public', 'index.html'));
  }
}
