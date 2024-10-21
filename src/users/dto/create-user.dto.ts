import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  contrasena: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsString()
  @IsNotEmpty()
  dni: string;

  @IsString()
  @IsOptional()
  gerencia?: string;

  @IsNumber()
  @IsOptional()
  numero_empleado?: number;
}
