import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true }); // ✅ active CORS ici
  
  // Configuration pour le déploiement
  app.useGlobalPipes(new ValidationPipe()); // ✅
  app.setGlobalPrefix('api'); // Préfixe pour les routes API
  
  // Port pour Render (utilise la variable d'environnement PORT)
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  
  console.log(`Application is running on port ${port}`);
}
bootstrap();
