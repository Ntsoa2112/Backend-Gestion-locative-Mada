import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { MonthlyRent } from 'src/entities/monthly_rent.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import handlebars from 'handlebars';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(MonthlyRent)
    private readonly mailRepository: Repository<MonthlyRent>,
    private mailerService: MailerService,
  ) {}
  async sendRentInvoice(
    ownerFirstName: string,
    ownerLastName: string,
    tenantFirstName: string,
    tenantLastName: string,
    date: string,
    postalCode: string,
    rentAmount: number,
    currency: string,
    tenantEmail: string,
    ownerEmail: string,
    id_property: number,
    id_tenant: number,
  ) {
    const source = fs.readFileSync('src/mail/templates/rent.hbs', 'utf8');
    const template = handlebars.compile(source);

    const html = template({
      ownerFirstName,
      ownerLastName,
      tenantFirstName,
      tenantLastName,
      date,
      postalCode,
      rentAmount,
      currency,
    });

    const sendEmail = await this.mailerService.sendMail({
      to: tenantEmail,
      cc: ownerEmail,
      subject: `Rent Invoice - ${date} `,
      html,
    });
    console.log(sendEmail.response);
    const createMailDto = {
      id_property: id_property,
      id_tenant: id_tenant,
      datetime: new Date(),
      content: html,
    };
    return await this.create(createMailDto);
  }

  async create(createMailDto: CreateMailDto) {
    const mail = this.mailRepository.create(createMailDto);
    return await this.mailRepository.save(mail);
  }

  async findAll() {
    return await this.mailRepository.find();
  }

  async findAllByProperty(id_property: number) {
    return await this.mailRepository.find({
      where: { id_property },
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number) {
    const mail = await this.mailRepository.findOneBy({ id });
    if (!mail) {
      throw new NotFoundException(`Mail with ID ${id} not found`);
    }
    return mail;
  }

  async update(id: number, updateMailDto: UpdateMailDto) {
    const mail = await this.findOne(id);
    this.mailRepository.merge(mail, updateMailDto);
    return await this.mailRepository.save(mail);
  }

  async remove(id: number) {
    const mail = await this.findOne(id);
    return await this.mailRepository.remove(mail);
  }
}
