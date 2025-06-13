import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Configuration CORS dynamique selon l'environnement
  const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.CORS_ORIGIN || false  // En production, utilise CORS_ORIGIN ou bloque tout
      : true, // En développement, autorise tout
    credentials: true,
  };

  const app = await NestFactory.create(AppModule, { cors: corsOptions });
  
  // Configuration pour le déploiement
  app.useGlobalPipes(new ValidationPipe()); // ✅
  app.setGlobalPrefix('api'); // Préfixe pour les routes API
  
  // Port pour Render (utilise la variable d'environnement PORT)
  const port = process.env.PORT || 3000;
  
  console.log('=== Configuration de démarrage ===');
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Port: ${port}`);
  console.log(`Database URL définie: ${process.env.DATABASE_URL ? 'Oui' : 'Non'}`);
  console.log(`JWT Secret défini: ${process.env.JWT_SECRET ? 'Oui' : 'Non'}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'Non définie'}`);
  console.log(`CORS Origin: ${process.env.CORS_ORIGIN || 'Développement (tout autorisé)'}`);
  
  await app.listen(port, '0.0.0.0');
  
  console.log(`🚀 Application is running on http://0.0.0.0:${port}`);
  console.log(`📝 API accessible sur: http://0.0.0.0:${port}/api`);
  console.log(`🌐 Frontend servi sur: http://0.0.0.0:${port}`);
}
bootstrap();
