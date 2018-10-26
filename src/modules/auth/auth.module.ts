import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from 'modules/auth/auth.service';
import { AuthController } from 'modules/auth/auth.controller';
import { JwtStrategy } from 'modules/auth/strategies/jwt.strategy';
import { User } from 'modules/users/entities/user.entity';

/**
 * En este módulo se hace uso del paquete passport para la autenticación. Se le
 * indica que se desea hacer uso del método de autenticación mediante JWT.
 *
 * Luego se usa el módulo de JWT. Se configura una clave secreta que debería
 * estar bien protegida. También se especifica un tiempo de expiración para
 * los tokens de 1 hora.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: { expiresIn: 3600 },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
