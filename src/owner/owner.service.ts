import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from '../entities/owner.entity';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import * as crypto from 'crypto';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner)
    private ownersRepository: Repository<Owner>,
  ) {}

  async create(createOwnerDto: CreateOwnerDto) {
    const { password, ...rest } = createOwnerDto;
    const hashedPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');

    const owner = this.ownersRepository.create({
      ...rest,
      password: hashedPassword,
    });
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

  async findOwnerByEmailPassword(email: string, password: string) {
    const hashedPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');

    const owner = await this.ownersRepository
      .createQueryBuilder('owner')
      .where('owner.email = :email', { email })
      .andWhere('owner.password = :hashedPassword', { hashedPassword })
      .select([
        'owner.id_owner',
        'owner.first_name',
        'owner.last_name',
        'owner.email',
        'owner.created_at',
        'owner.updated_at',
      ])
      .getOne();

    if (!owner) {
      throw new NotFoundException('Email or password is incorrect');
    }

    return owner;
  }
}
