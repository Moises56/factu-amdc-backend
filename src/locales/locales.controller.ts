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
import { LocalesService } from './locales.service';
import { UpdateLocaleDto } from './dto/update-locale.dto';
import { CreateLocaleDto } from './dto/create-locale.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '@prisma/client';
import { Roles } from '../auth/roles.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('locales')
@Controller('locales')
export class LocalesController {
  constructor(private readonly localesService: LocalesService) {}

  @ApiOperation({ summary: 'Obtener todos los locales' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN, Role.MARKET, Role.USER)
  @Get()
  async allLocales() {
    return this.localesService.findAll();
  }

  @ApiOperation({ summary: 'Crear un nuevo local' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  async createLocale(@Body() createLocaleDto: CreateLocaleDto) {
    return this.localesService.create({
      ...createLocaleDto,
      Mercado: { connect: { id: createLocaleDto.mercadoId } },
    });
  }

  @ApiOperation({ summary: 'Obtener un local por ID' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MARKET, Role.USER)
  @Get(':id')
  async getLocale(@Param('id') id: string) {
    return this.localesService.findOne(id);
  }

  @ApiOperation({ summary: 'Actualizar un local' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put(':id')
  async updateLocale(
    @Param('id') id: string,
    @Body() updateLocaleDto: UpdateLocaleDto,
  ) {
    return this.localesService.update(id, updateLocaleDto);
  }

  @ApiOperation({ summary: 'Eliminar un local' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteLocale(@Param('id') id: string) {
    return this.localesService.remove(id);
  }

  @ApiOperation({ summary: 'Obtener todos los locales de un mercado' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN, Role.MARKET, Role.USER)
  @Get('mercado/:id')
  async getLocalesByMarketId(@Param('id') id: string) {
    return this.localesService.findLocalesByMarketId(id);
  }
}
