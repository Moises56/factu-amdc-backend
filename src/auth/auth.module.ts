import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller'; // Importa AuthController
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: 'YOUR_SECRET_KEY', // Cambiar a una variable de entorno en producción
      signOptions: { expiresIn: '60m' },
    }),
    UsersModule,
    PrismaModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController], // Asegúrate de agregar AuthController aquí
  exports: [AuthService],
})
export class AuthModule {}
