import { IsString, IsEmail, IsNotEmpty, IsInt } from 'class-validator';

export class CreateTenantDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  postal_address: string;

  @IsString()
  @IsNotEmpty()
  telephone: string;

  @IsInt()
  @IsNotEmpty()
  id_property: number;
}
