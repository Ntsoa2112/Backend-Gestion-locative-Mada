import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TenantController } from './tenant/tenant.controller';

@Injectable()
export class RentInvoiceTask {
  constructor(private readonly tenantController: TenantController) {}

  //@Cron('*/2 * * * *') // This cron job will run every 2 minutes
  @Cron('0 8 1 * *') // This cron job will run at 8 AM on the 1st day of every month
  handleCron() {
    this.tenantController.sendRentInvoice();
  }
}
