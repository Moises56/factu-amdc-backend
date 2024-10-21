import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LocalesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.LocalCreateInput) {
    // Verificar si el mercado existe
    const mercado = await this.prisma.mercado.findUnique({
      where: { id: data.Mercado.connect.id },
    });
    if (!mercado) {
      throw new ForbiddenException('El mercado no existe');
    }

    // Verificar si el local ya existe
    const local = await this.prisma.local.findFirst({
      where: { numero_local: data.numero_local },
    });
    if (local) {
      throw new ForbiddenException('El local ya existe');
    }

    // Crear el local
    const newLocal = await this.prisma.local.create({
      data: {
        propietario: data.propietario,
        DNI: data.DNI,
        numero_local: data.numero_local,
        nombre_local: data.nombre_local,
        tipo_local: data.tipo_local,
        estado_local: data.estado_local,
        latitud: data.latitud,
        longitud: data.longitud,
        telefono: data.telefono,
        monto: data.monto,
        permiso_operacion: data.permiso_operacion,
        direccion_local: data.direccion_local,
        Mercado: { connect: { id: data.Mercado.connect.id } }, // Referenciar el mercado correctamente
      },
    });

    // Retornar la estructura de respuesta deseada
    return {
      data: newLocal,
      message: 'Local creado con éxito',
      status: HttpStatus.CREATED,
    };
  }

  async findAll() {
    // Retornar la estructura de respuesta deseada
    return {
      data: await this.prisma.local.findMany({
        orderBy: {
          numero_local: 'asc',
        },
      }),
      message: 'Lista de locales',
      status: HttpStatus.OK,
    };
  }

  async findOne(id: string) {
    // Verificar si el local existe
    const local = await this.prisma.local.findUnique({
      where: { id },
    });
    if (!local) {
      throw new ForbiddenException('El local no existe');
    }
    // Retornar la estructura de respuesta deseada
    return {
      data: local,
      message: 'Local encontrado',
      status: HttpStatus.OK,
    };
  }

  async update(id: string, data: Prisma.LocalUpdateInput) {
    try {
      // Verificar si el local existe
      const local = await this.prisma.local.findUnique({
        where: { id },
      });
      if (!local) {
        throw new ForbiddenException('El local no existe');
      }

      // Actualizar el local
      const updatedLocal = await this.prisma.local.update({
        where: { id },
        data,
      });

      // Retornar la estructura de respuesta deseada
      return {
        data: updatedLocal,
        message: 'Local actualizado con éxito',
        status: HttpStatus.OK,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        // Código específico para violación de restricción única
        throw new ForbiddenException('Ya existe un local con este nombre');
      }
      throw error; // Lanzar cualquier otro error que no sea de violación de restricción única
    }
  }

  async remove(id: string) {
    // Verificar si el local existe
    const local = await this.prisma.local.findUnique({
      where: { id },
    });
    if (!local) {
      throw new ForbiddenException('El local no existe');
    }

    // Eliminar el local
    await this.prisma.local.delete({
      where: { id },
    });

    // Retornar la estructura de respuesta deseada
    return {
      message: 'Local eliminado con éxito',
      status: HttpStatus.OK,
    };
  }

  async findLocalesByMarketId(mercadoId: string) {
    const mercado = await this.prisma.mercado.findUnique({
      where: { id: mercadoId },
      include: {
        Locales: {
          orderBy: {
            numero_local: 'asc', // Ordenar por el campo 'numero_local' en orden ascendente
          },
        },
      },
    });

    if (!mercado) {
      throw new ForbiddenException('El mercado no existe');
    }

    return {
      mercado: mercado.nombre_mercado,
      data: mercado.Locales,
      message: 'Lista de locales por mercado',
      status: HttpStatus.OK,
    };
  }
}
