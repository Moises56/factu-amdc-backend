import { Prisma, Role } from '@prisma/client';

export class User implements Prisma.UserUncheckedCreateInput {
  id?: string;
  correo: string;
  nombre: string;
  apellido: string;
  contrasena: string;
  telefono: string;
  dni: string;
  gerencia?: string; // Ensure this matches the schema definition
  numero_empleado?: number; // Ensure this matches the schema definition
  createdAt?: Date | string;
  updatedAt?: Date | string;
  role?: Role; // Assuming this is the correct field name for the role
}
