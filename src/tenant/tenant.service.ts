import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from '../entities/tenant.entity';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { PropertyService } from 'src/property/property.service';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    private readonly propertyService: PropertyService,
  ) {}

  async create(createTenantDto: CreateTenantDto) {
    const { id_property, ...tenantData } = createTenantDto;
    const property = await this.propertyService.findOne(id_property);
    if (!property) {
      throw new NotFoundException(`Property with ID ${id_property} not found`);
    }

    const tenant = this.tenantRepository.create({
      ...tenantData,
      property,
    });

    return await this.tenantRepository.save(tenant);
  }

  async findAll() {
    return await this.tenantRepository.find({
      relations: ['property'],
    });
  }

  async findOne(id: number) {
    const tenant = await this.tenantRepository.findOne({
      where: { id_tenant: id },
      relations: ['property', 'property.owner'],
    });

    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    return tenant;
  }

  async findOneByProperty(id: number) {
    const tenant = await this.tenantRepository.findOne({
      where: { id_property: id },
    });
    return tenant;
  }

  async update(id: number, updateTenantDto: UpdateTenantDto) {
    const tenant = await this.findOne(id);

    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    Object.assign(tenant, updateTenantDto);

    return await this.tenantRepository.save(tenant);
  }

  async remove(id: number) {
    const tenant = await this.findOne(id);

    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    return await this.tenantRepository.remove(tenant);
  }
}
