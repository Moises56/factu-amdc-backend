import { Module } from '@nestjs/common';
import { LocalesService } from './locales.service';
import { LocalesController } from './locales.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [LocalesController],
  providers: [LocalesService],
  imports: [PrismaModule],
})
export class LocalesModule {}
