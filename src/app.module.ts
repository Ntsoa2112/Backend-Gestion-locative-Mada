import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerModule } from './owner/owner.module';
import { AuthModule } from './auth/auth.module';
import { PropertyModule } from './property/property.module';
import { TenantModule } from './tenant/tenant.module';
import { MailModule } from './mail/mail.module';
import { ScheduleModule } from '@nestjs/schedule';
import { RentInvoiceTask } from './rent-invoice.task';
import { TenantController } from './tenant/tenant.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true, // Cela crée automatiquement les tables (utile pour le développement)
      logging: true, // Active les logs SQL
      entities: [__dirname + '/entities/*{.ts,.js}'], // Liste des entités (modèles)
    }),
    ScheduleModule.forRoot(),
    OwnerModule,
    AuthModule,
    PropertyModule,
    TenantModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService, RentInvoiceTask, TenantController],
})
export class AppModule {}
