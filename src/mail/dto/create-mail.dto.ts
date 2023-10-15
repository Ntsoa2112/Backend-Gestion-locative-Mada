import { IsNotEmpty, IsString } from 'class-validator';
export class CreateMailDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  datetime: Date;

  @IsNotEmpty()
  id_property: number;

  @IsNotEmpty()
  id_tenant: number;
}
