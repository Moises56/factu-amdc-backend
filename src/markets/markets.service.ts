import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MarketsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.MercadoCreateInput) {
    // Verificar si el mercado ya existe
    const mercado = await this.prisma.mercado.findUnique({
      where: { nombre_mercado: data.nombre_mercado },
    });
    if (mercado) {
      throw new ForbiddenException('El mercado ya existe');
    }

    // Crear el mercado
    const newMercado = await this.prisma.mercado.create({ data });

    // Retornar la estructura de respuesta deseada
    return {
      data: newMercado,
      message: 'Mercado creado con éxito',
      status: HttpStatus.CREATED,
    };
  }

  async findAll() {
    // Retornar la estructura de respuesta deseada
    return {
      data: await this.prisma.mercado.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      }),
      message: 'Lista de mercados',
      status: HttpStatus.OK,
    };
  }

  async findOne(id: string) {
    //verificar si el mercado existe
    const mercado = await this.prisma.mercado.findUnique({
      where: { id },
    });
    if (!mercado) {
      throw new ForbiddenException('El mercado no existe');
    }
    // Retornar la estructura de respuesta deseada
    return {
      data: mercado,
      message: 'Mercado encontrado',
      status: HttpStatus.OK,
    };
  }

  async update(id: string, data: Prisma.MercadoUpdateInput) {
    try {
      // Verificar si el mercado existe
      const mercado = await this.prisma.mercado.findUnique({
        where: { id },
      });
      if (!mercado) {
        throw new ForbiddenException('El mercado no existe');
      }

      // Actualizar el mercado
      const updatedMercado = await this.prisma.mercado.update({
        where: { id },
        data,
      });

      // Retornar la estructura de respuesta deseada
      return {
        data: updatedMercado,
        message: 'Mercado actualizado con éxito',
        status: HttpStatus.OK,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        // Código específico para violación de restricción única
        throw new ForbiddenException('Ya existe un mercado con este nombre');
      }
      throw error; // Lanzar cualquier otro error que no sea de violación de restricción única
    }
  }

  async remove(id: string) {
    //verificar si el mercado existe
    const mercado = await this.prisma.mercado.findUnique({
      where: { id },
    });
    if (!mercado) {
      throw new ForbiddenException('El mercado no existe');
    }
    // retornar la estructura de respuesta deseada
    return {
      data: await this.prisma.mercado.delete({ where: { id } }),
      message: 'Mercado eliminado con éxito',
      status: HttpStatus.OK,
    };
  }
}
