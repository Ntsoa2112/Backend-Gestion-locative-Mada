import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from 'src/entities/tenant.entity';
import { PropertyModule } from 'src/property/property.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant]), PropertyModule],
  controllers: [TenantController],
  providers: [TenantService],
})
export class TenantModule {}
