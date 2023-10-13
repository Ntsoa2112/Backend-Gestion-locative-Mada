import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { OwnerModule } from 'src/owner/owner.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from 'src/entities/property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property]), OwnerModule],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
