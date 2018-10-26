import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'modules/users/entities/user.entity';
import { AuthService } from 'modules/auth/auth.service';
import { JwtPayload } from 'modules/auth/interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY || 'secretKey',
    });
  }

  async validate({ id }: JwtPayload): Promise<boolean> {
    const isValid = !!(await this.users.findOne(id));
    if (!isValid) {
      throw new UnauthorizedException();
    }

    return isValid;
  }
}
