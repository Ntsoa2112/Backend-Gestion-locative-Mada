import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { OwnerService } from '../owner/owner.service';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    private readonly ownerService: OwnerService,
  ) {}

  async create(createPropertyDto: CreatePropertyDto) {
    const { id_owner, ...propertyData } = createPropertyDto;
    const owner = await this.ownerService.findOne(id_owner);

    if (!owner) {
      throw new NotFoundException('Owner not found');
    }

    const property = this.propertyRepository.create({
      ...propertyData,
      owner,
    });

    return await this.propertyRepository.save(property);
  }

  async findAll() {
    return await this.propertyRepository.find({
      relations: ['owner'],
    });
  }

  async findOne(id: number) {
    const property = await this.propertyRepository.findOne({
      where: { id_property: id },
      relations: ['owner'],
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    return property;
  }

  async update(id: number, updatePropertyDto: UpdatePropertyDto) {
    const property = await this.findOne(id);

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    const { id_owner, ...propertyData } = updatePropertyDto;

    if (id_owner) {
      const owner = await this.ownerService.findOne(id_owner);

      if (!owner) {
        throw new NotFoundException('Owner not found');
      }

      property.owner = owner;
    }

    Object.assign(property, propertyData);

    return await this.propertyRepository.save(property);
  }

  async remove(id: number) {
    const property = await this.findOne(id);

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    return await this.propertyRepository.remove(property);
  }

  async findAllByOwner(ownerId: number) {
    return await this.propertyRepository.find({
      where: { owner: { id_owner: ownerId } },
    });
  }
}
