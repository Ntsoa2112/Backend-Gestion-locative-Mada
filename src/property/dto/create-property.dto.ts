import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePropertyDto {
  @IsInt()
  @IsNotEmpty()
  rent: number;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  surface_area: string;

  @IsString()
  @IsNotEmpty()
  postal_address: string;

  @IsInt()
  @IsNotEmpty()
  id_owner: number;
}
