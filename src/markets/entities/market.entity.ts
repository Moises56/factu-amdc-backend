import { Prisma } from '@prisma/client';

export class Market implements Prisma.MercadoUncheckedCreateInput {
  id?: string;
  nombre_mercado: string;
  direccion: string;
  latitud: number;
  longitud: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
