import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { promisify } from 'util';

import { JwtPayload } from 'modules/auth/interfaces/jwt-payload.interface';
import { User } from 'modules/users/entities/user.entity';

const comparePasswordAsync = promisify(bcrypt.compare);

@Injectable()
export class AuthService {
  /**
   * Se inyectan dos providers: el servicio de JWT y el repositorio de usuarios.
   */
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  /**
   * Este método crea un JWT (token) que se envia al usuario. El usuario usará
   * dicho token en sucesivas peticiones para autenticarse.
   *
   * Se comprueba que el usuario y contraseña sean correctos y entonces se
   * firma un token y se le envía al usuario.
   *
   */
  public async createToken(email: string, password: string): Promise<string> {
    const user = await this.users.findOne({ where: { email } });
    if (!user) {
      throw Error('Invalid credentials');
    }

    const isMatch = await comparePasswordAsync(password, user.password);
    if (!isMatch) {
      throw Error('Invalid credentials');
    }

    return this.jwtService.sign({ id: user.id });
  }
}
