import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from '../entities/owner.entity';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner)
    private ownersRepository: Repository<Owner>,
  ) {}

  async create(createOwnerDto: CreateOwnerDto) {
    const owner = this.ownersRepository.create(createOwnerDto);
    return await this.ownersRepository.save(owner);
  }

  async findAll() {
    return await this.ownersRepository.find();
  }

  async findOne(id: number) {
    const owner = await this.ownersRepository.findOneBy({ id_owner: id });
    if (!owner) {
      throw new NotFoundException(`Owner with ID ${id} not found`);
    }
    return owner;
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto) {
    const existingOwner = await this.findOne(id);
    this.ownersRepository.merge(existingOwner, updateOwnerDto);
    return await this.ownersRepository.save(existingOwner);
  }

  async remove(id: number) {
    const owner = await this.findOne(id);
    return await this.ownersRepository.remove(owner);
  }
}
