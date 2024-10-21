import {
  Injectable,
  ConflictException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async validateUser(correo: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { correo } });

    if (!user) {
      throw new UnauthorizedException('Correo no existe');
    }

    const isPasswordValid = await bcrypt.compare(pass, user.contrasena);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const { contrasena, ...result } = user;
    console.log(contrasena, result);
    return result;
  }

  async login(user: Prisma.UserWhereUniqueInput) {
    const payload = { correo: user.correo, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);
    return {
      token: token,
      message: 'Inicio de sesión con éxito',
      status: HttpStatus.OK,
      user: user.nombre + ' ' + user.apellido,
      email: user.correo,
      rol: user.role,
      idUser: user.id,
    };
  }

  async register(user: any) {
    const existingUser = await this.prisma.user.findUnique({
      where: { correo: user.correo },
    });

    if (existingUser) {
      throw new ConflictException('El usuario con este email ya existe');
    }

    const hashedPassword = await bcrypt.hash(user.contrasena, 10);
    const newUser = await this.prisma.user.create({
      data: {
        ...user,
        contrasena: hashedPassword,
      },
    });

    return {
      data: newUser,
      message: 'Usuario registrado con éxito',
      status: HttpStatus.CREATED,
    };
  }
}
