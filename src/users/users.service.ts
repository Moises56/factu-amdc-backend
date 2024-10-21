import { Injectable, ConflictException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput) {
    const existingUser = await this.prisma.user.findUnique({
      where: { correo: data.correo },
    });

    if (existingUser) {
      throw new ConflictException('El usuario con este email ya existe');
    }

    const hashedPassword = await bcrypt.hash(data.contrasena, 10);
    const newUser = await this.prisma.user.create({
      data: {
        ...data,
        contrasena: hashedPassword,
      },
    });

    return {
      data: newUser,
      message: 'Usuario creado con éxito',
      status: HttpStatus.CREATED,
    };
  }

  async findAll() {
    // Retornar la estructura de respuesta deseada
    // tiene que retornar la lista de usuarios en orden de creación creciente
    return {
      data: await this.prisma.user.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      }),
      message: 'Lista de usuarios',
      status: HttpStatus.OK,
    };
  }

  async findOne(id: string) {
    //verificar si el usuario existe
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new ConflictException('El usuario no existe');
    }
    // Retornar la estructura de respuesta deseada
    return {
      data: user,
      message: 'Usuario encontrado',
      status: HttpStatus.OK,
    };
  }

  async updateUser(id: string, data: any) {
    // tiene que verificar si el usuario existe y retornar la estructura de respuesta deseada con el usuario actualizado, la contraseña debe ser encriptada
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new ConflictException('El usuario no existe');
    }

    const hashedPassword = await bcrypt.hash(data.contrasena, 10);
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        contrasena: hashedPassword,
      },
    });

    return {
      data: updatedUser,
      message: 'Usuario actualizado con éxito',
      status: HttpStatus.OK,
    };
  }

  async deleteUser(id: string) {
    // verificar si el usuario existe y retornar la estructura de respuesta deseada
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new ConflictException('El usuario no existe');
    }

    await this.prisma.user.delete({
      where: { id },
    });

    return {
      message: 'Usuario eliminado con éxito',
      status: HttpStatus.OK,
    };
  }

  //* eviar correo electrónico de confirmación
}
