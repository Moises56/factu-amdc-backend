import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('facturas')
@Controller('facturas')
export class FacturasController {
  constructor(private readonly facturasService: FacturasService) {}

  @ApiOperation({ summary: 'Obtener todas las facturas' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN, Role.MARKET, Role.USER)
  @Get()
  async allFacturas() {
    return this.facturasService.findAll();
  }

  @ApiOperation({ summary: 'Crear una nueva factura' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MARKET, Role.USER)
  @Post()
  async createFactura(@Body() createFacturaDto: CreateFacturaDto) {
    return this.facturasService.create(createFacturaDto);
  }

  @ApiOperation({ summary: 'Obtener una factura por ID' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MARKET, Role.USER)
  @Get(':id')
  async getFactura(@Param('id') id: string) {
    return this.facturasService.findOne(id);
  }

  @ApiOperation({ summary: 'Actualizar una factura' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put(':id')
  async updateFactura(
    @Param('id') id: string,
    @Body() updateFacturaDto: UpdateFacturaDto,
  ) {
    return this.facturasService.update(id, updateFacturaDto);
  }

  @ApiOperation({ summary: 'Eliminar una factura' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteFactura(@Param('id') id: string) {
    return this.facturasService.remove(id);
  }

  //Obtener facturas por ID de local
  @ApiOperation({ summary: 'Obtener facturas por ID de local' })
  @Get('local/:localId')
  async getFacturasByLocal(@Param('localId') localId: string) {
    return this.facturasService.findByLocal(localId);
  }
}
