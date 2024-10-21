import { Module } from '@nestjs/common';
import { MarketsModule } from './markets/markets.module';
import { UsersModule } from './users/users.module';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { LocalesModule } from './locales/locales.module';
import { FacturasModule } from './facturas/facturas.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MarketsModule,
    UsersModule,
    AuthModule,
    PrismaModule,
    LocalesModule,
    FacturasModule,
    MailerModule,
  ],
})
export class AppModule {}
