import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() req: LoginDto) {
    try {
      const user = await this.authService.validateUser(
        req.correo,
        req.contrasena,
      );
      if (!user) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      return this.authService.login(user);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('register')
  async register(@Body() req: RegisterDto) {
    try {
      const result = await this.authService.register(req);
      return {
        data: result.data,
        message: result.message,
        status: result.status,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.CONFLICT,
      );
    }
  }

  @Post('logout')
  async logout() {
    // En la mayoría de los casos, simplemente eliminar el token en el cliente
    return { message: 'Logged out successfully' };
  }
}
