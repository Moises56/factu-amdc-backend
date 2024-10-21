import { IsEnum, IsString, IsOptional, IsInt, IsEmail } from 'class-validator';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MARKET = 'MARKET',
}

export class CreateUserDto {
  @IsEmail({}, { message: 'El correo debe tener un formato válido' })
  correo: string;

  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsString()
  contrasena: string;

  @IsString()
  telefono: string;

  @IsString()
  dni: string;

  @IsOptional() // Opcional
  @IsString()
  gerencia?: string;

  @IsOptional() // Opcional
  @IsInt()
  numero_empleado?: number;

  @IsEnum(Role, { message: 'El rol debe ser USER, ADMIN o MARKET' })
  role: Role;
}
