import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { OwnerService } from './owner/owner.service';
import { CreateOwnerDto } from './owner/dto/create-owner.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private ownerService: OwnerService,
  ) {}

  @Post('auth/login')
  async login(@Request() req) {
    try {
      const owner = await this.ownerService.findOwnerByEmailPassword(
        req.body.email,
        req.body.password,
      );
      return this.authService.login(owner);
    } catch (error) {
      throw new NotFoundException('Invalid email or password');
    }
  }

  @Post('auth/register')
  async register(@Body() owner: CreateOwnerDto) {
    try {
      const response = await this.ownerService.create(owner);
      if (response) {
        return this.authService.login(response);
      } else {
        throw new HttpException('Registration failed', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException('Registration failed', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('verification')
  @UseGuards(JwtAuthGuard)
  test(): boolean {
    return true;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
