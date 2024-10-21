import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ResendModule } from 'nestjs-resend';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    PrismaModule,
    ResendModule.forAsyncRoot({
      useFactory: async () => ({
        apiKey: process.env.KEY,
      }),
    }),
  ],
})
export class UsersModule {}
