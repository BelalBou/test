import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CheckoutModule } from './checkout/checkout.module'; // 👈 ajoute cette
import { OrdersModule } from './orders/orders.module';
import { VendorsModule } from './vendors/vendors.module';
import { CategoryModule } from './categories/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configuration pour servir les fichiers statiques du frontend
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'],
    }),    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        // Si DATABASE_URL est définie (production), l'utiliser
        const databaseUrl = config.get('DATABASE_URL');
        
        if (databaseUrl) {
          console.log('Utilisation de DATABASE_URL pour la connexion');
          return {
            type: 'postgres',
            url: databaseUrl,
            autoLoadEntities: true,
            synchronize: true, // ⚠️ À désactiver en production après création des tables
            ssl: {
              rejectUnauthorized: false // Nécessaire pour Render
            }
          };
        } else {
          // Configuration locale avec variables individuelles
          console.log('Utilisation des variables individuelles pour la connexion');
          return {
            type: 'postgres',
            host: config.get('DB_HOST'),
            port: parseInt(config.get('DB_PORT') || '5432', 10),
            username: config.get('DB_USERNAME'),
            password: config.get('DB_PASSWORD'),
            database: config.get('DB_NAME'),
            autoLoadEntities: true,
            synchronize: true,
          };
        }
      },
    }),

    UsersModule,
    AuthModule,
    ProductsModule,
    CheckoutModule,
    OrdersModule,
    VendorsModule,
    CategoryModule, // 👈 ajoute ici aussi
  ],
  controllers: [AppController],
})
export class AppModule {}
