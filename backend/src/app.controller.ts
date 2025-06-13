import { Controller, Get, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  // Route pour servir l'application Angular uniquement pour les routes qui ne commencent pas par /api
  @Get('*')
  serveAngularApp(@Req() req: Request, @Res() res: Response): void {
    // Si la route commence par /api, ne pas intercepter
    if (req.url.startsWith('/api')) {
      return;
    }
    
    const indexPath = join(__dirname, '..', 'public', 'index.html');
    console.log(`Serving Angular app for route: ${req.url} from: ${indexPath}`);
    res.sendFile(indexPath);
  }
}
