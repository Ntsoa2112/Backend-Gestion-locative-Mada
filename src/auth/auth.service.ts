import { Injectable } from '@nestjs/common';
import { OwnerService } from '../owner/owner.service';
import { JwtService } from '@nestjs/jwt';

interface loginOwner {
  id_owner: number;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private ownerService: OwnerService,
    private jwtService: JwtService,
  ) {}

  async validateOwner(email: string, pass: string): Promise<any> {
    const owner = await this.ownerService.findOwnerByEmailPassword(email, pass);
    if (owner) {
      return owner;
    }
    return null;
  }

  async login(owner: loginOwner) {
    const payload = { email: owner.email, sub: owner.id_owner };

    return {
      ownerId: owner.id_owner,
      access_token: this.jwtService.sign(payload),
    };
  }
}
