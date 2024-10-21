import { Injectable, ForbiddenException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';

@Injectable()
export class FacturasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFacturaDto: CreateFacturaDto) {
    // Obtener el año actual para el formato del correlativo.
    const currentYear = new Date().getFullYear();

    // Buscar la última factura del año actual.
    const lastFactura = await this.prisma.factura.findFirst({
      where: {
        correlativo: {
          startsWith: `Fact-${currentYear}-`, // Buscar facturas cuyo correlativo empiece con el año actual.
        },
      },
      orderBy: { createdAt: 'desc' }, // Ordenar por fecha de creación en orden descendente para obtener la más reciente.
      select: { correlativo: true },
    });

    // Extraer el último número del correlativo si existe, de lo contrario iniciar en 0.
    const lastCorrelativoNumber = lastFactura?.correlativo
      ? parseInt(lastFactura.correlativo.split('-').pop() || '0', 10)
      : 0;

    // Incrementar el número de correlativo.
    const nextCorrelativoNumber = lastCorrelativoNumber + 1;

    // Formar el nuevo correlativo en el formato `Fact-YYYY-N`.
    const correlativo = `Fact-${currentYear}-${nextCorrelativoNumber}`;

    // Asignar el correlativo al DTO antes de guardar la nueva factura.
    createFacturaDto.correlativo = correlativo;

    // Crear la nueva factura en la base de datos.
    const newFactura = await this.prisma.factura.create({
      data: createFacturaDto,
    });

    return {
      data: newFactura,
      message: 'Factura creada con éxito',
      status: HttpStatus.CREATED,
    };
  }

  async findAll() {
    //obtener todas las facturas y ordenarlas por fecha de creación de forma descendente
    const facturas = await this.prisma.factura.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    // ahora el campo de mercado es un objeto id, por lo que se debe hacer un join con la tabla mercado para obtener el nombre del mercado
    for (const fact of facturas) {
      console.log(fact.mercado);
      const mercado = await this.prisma.mercado.findUnique({
        where: { id: fact.mercado },
      });
      // console.log(mercado.nombre_mercado);
      fact.mercado = mercado.nombre_mercado;
      // console.log(fact.mercado);
    }

    return {
      data: facturas,
      message: 'Lista de facturas',
      status: HttpStatus.OK,
    };
  }

  async findOne(id: string) {
    const factura = await this.prisma.factura.findUnique({
      where: { id },
    });
    if (!factura) {
      throw new ForbiddenException('La factura no existe');
    }
    return {
      data: factura,
      message: 'Factura encontrada',
      status: HttpStatus.OK,
    };
  }

  async update(id: string, updateFacturaDto: UpdateFacturaDto) {
    const factura = await this.prisma.factura.findUnique({
      where: { id },
    });
    if (!factura) {
      throw new ForbiddenException('La factura no existe');
    }

    const updatedFactura = await this.prisma.factura.update({
      where: { id },
      data: updateFacturaDto,
    });

    return {
      data: updatedFactura,
      message: 'Factura actualizada con éxito',
      status: HttpStatus.OK,
    };
  }

  async remove(id: string) {
    const factura = await this.prisma.factura.findUnique({
      where: { id },
    });
    if (!factura) {
      throw new ForbiddenException('La factura no existe');
    }

    await this.prisma.factura.delete({
      where: { id },
    });

    return {
      message: 'Factura eliminada con éxito',
      status: HttpStatus.OK,
    };
  }

  async findByLocal(localId: string) {
    // Obtener facturas por ID de local y ordenarlas por fecha de creación
    const facturas = await this.prisma.factura.findMany({
      where: { localId }, // Asegúrate de que el campo se llame localId en tu modelo
      orderBy: { createdAt: 'desc' },
    });

    for (const fact of facturas) {
      const mercado = await this.prisma.mercado.findUnique({
        where: { id: fact.mercado },
      });
      fact.mercado = mercado.nombre_mercado; // Asignar el nombre del mercado
    }

    return {
      data: facturas,
      message: 'Lista de facturas por local',
      status: HttpStatus.OK,
    };
  }
}
