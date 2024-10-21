import { Prisma } from '@prisma/client';
export class Locale implements Prisma.LocalUncheckedCreateInput {
  id?: string;
  nombre_local: string;
  numero_local: string;
  permiso_operacion: string;
  tipo_local: string;
  direccion_local: string;
  estado_local: string;
  monto: number;
  propietario: string;
  DNI: string;
  telefono: string;
  latitud: number;
  longitud: number;
  mercadoId: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
