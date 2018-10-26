import { Controller } from '@nestjs/common';
import { Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';

import { AuthService } from 'modules/auth/auth.service';
import { IUser } from 'modules/users/interfaces/user.interface';
import { CreateUserDto } from 'modules/users/dtos/create-user.dto';
import { LoginDto } from 'modules/auth/dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * AuthController sólo contiene un método que maneja una petición:
   *
   * POST /users
   *
   * Esta petición debe contener usuario y contraseña. Si son válidos, se
   * creará un JWT (token) que se le envia al usuario y le permite realizar
   * peticiones autenticadas incluyendo este token en las cabeceras:
   *
   * Authorization: Bearer <token recibido>
   */
  @Post('login')
  public async login(@Body() { email, password }: LoginDto): Promise<string> {
    return JSON.stringify(await this.authService.createToken(email, password));
  }
}
