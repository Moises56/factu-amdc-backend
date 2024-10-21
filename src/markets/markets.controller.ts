import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { MarketsService } from './markets.service';
import { CreateMarketDto } from './dto/create-market.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '@prisma/client';
import { Roles } from '../auth/roles.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('markets')
@Controller('markets')
export class MarketsController {
  constructor(private readonly marketsService: MarketsService) {}

  @ApiOperation({ summary: 'Obtener todos los mercados' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN, Role.MARKET, Role.USER)
  @Get()
  async allMarkets() {
    return this.marketsService.findAll();
  }

  @ApiOperation({ summary: 'Crear un nuevo mercado' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  async createMarket(@Body() data: CreateMarketDto) {
    return this.marketsService.create(data);
  }

  @ApiOperation({ summary: 'Actualizar un mercado existente' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put(':id')
  updateMarket(@Param('id') id: string, @Body() updateMarketDto: any) {
    return this.marketsService.update(id, updateMarketDto);
  }

  @ApiOperation({ summary: 'Eliminar un mercado existente' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async removeMarket(@Param('id') id: string) {
    await this.marketsService.remove(id);
    return { message: 'El mercado ha sido eliminado exitosamente.' };
  }

  @ApiOperation({ summary: 'Obtener detalles de un mercado por ID' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN, Role.MARKET, Role.USER)
  @Get(':id')
  async findOneMarket(@Param('id') id: string) {
    try {
      return await this.marketsService.findOne(id);
    } catch (error) {
      throw new ForbiddenException('el mercado no existe.');
    }
  }
}
