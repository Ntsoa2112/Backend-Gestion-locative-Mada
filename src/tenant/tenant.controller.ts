import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PropertyService } from 'src/property/property.service';
import { MailService } from 'src/mail/mail.service';
import formatDate from 'src/type';

@Controller('tenant')
@UseGuards(JwtAuthGuard)
export class TenantController {
  constructor(
    private readonly tenantService: TenantService,
    private readonly propertyService: PropertyService,
    private readonly mailService: MailService,
  ) {}

  @Post()
  create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantService.create(createTenantDto);
  }

  @Get()
  findAll() {
    return this.tenantService.findAll();
  }

  @Post('sendRentInvoice')
  async sendRentInvoice() {
    const propertiesOwner = await this.propertyService.findAll();
    propertiesOwner.map(async (propertyOwner) => {
      const tenant = await this.tenantService.findOneByProperty(
        propertyOwner.id_property,
      );
      if (tenant) {
        try {
          const res = await this.mailService.sendRentInvoice(
            propertyOwner.owner.first_name,
            propertyOwner.owner.last_name,
            tenant.first_name,
            tenant.last_name,
            formatDate(new Date()),
            propertyOwner.postal_address,
            propertyOwner.rent,
            propertyOwner.currency,
            tenant.email,
            propertyOwner.owner.email,
            propertyOwner.id_property,
            tenant.id_tenant,
          );
          console.log(res.id);
        } catch (error) {
          console.error('Error sending rent invoice email:', error);
          return;
        }
      }
    });
  }

  @Get('tenantsByOwner/:id_owner')
  async findAllTenantByOwner(@Param('id_owner') id_owner: string) {
    const result = [];
    const propertiesOwner = await this.propertyService.findAllByOwner(
      +id_owner,
    );

    await Promise.all(
      propertiesOwner.map(async (propertyOwner) => {
        const tenant = await this.tenantService.findOneByProperty(
          propertyOwner.id_property,
        );
        if (tenant) {
          result.push({ propertyOwner, tenant });
        }
      }),
    );

    return result;
  }

  @Get('propertyWithoutTenant/:id_owner')
  async findAllPropertyWithoutTenant(@Param('id_owner') id_owner: string) {
    const result = [];
    const propertiesOwner = await this.propertyService.findAllByOwner(
      +id_owner,
    );

    await Promise.all(
      propertiesOwner.map(async (propertyOwner) => {
        const tenant = await this.tenantService.findOneByProperty(
          propertyOwner.id_property,
        );
        if (!tenant) {
          result.push(propertyOwner);
        }
      }),
    );

    return result;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
    return this.tenantService.update(+id, updateTenantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tenantService.remove(+id);
  }
}
