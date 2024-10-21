import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLocaleDto {
  @IsString()
  @IsNotEmpty()
  nombre_local: string;

  @IsNumber()
  @IsNotEmpty()
  numero_local: string;

  @IsString()
  @IsNotEmpty()
  permiso_operacion: string;

  @IsString()
  @IsNotEmpty()
  tipo_local: string;

  @IsString()
  @IsNotEmpty()
  direccion_local: string;

  @IsString()
  @IsNotEmpty()
  estado_local: string;

  @IsNumber()
  monto: number;

  @IsString()
  @IsNotEmpty()
  propietario: string;

  @IsString()
  @IsNotEmpty()
  DNI: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsNumber()
  latitud: number;

  @IsNumber()
  longitud: number;

  @IsString()
  @IsNotEmpty()
  mercadoId: string;
}
