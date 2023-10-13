import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OwnerModule } from '../owner/owner.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    OwnerModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '5d' },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
//https://docs.nestjs.com/security/authentication
