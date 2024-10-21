import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMarketDto {
  @IsString()
  @IsNotEmpty()
  nombre_mercado: string;

  @IsString()
  direccion: string;

  @IsNumber()
  latitud: number;

  @IsNumber()
  longitud: number;
}
