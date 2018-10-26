import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from 'modules/users/users.controller';
import { UsersService } from 'modules/users/users.service';
import { User } from 'modules/users/entities/user.entity';
import { AuthModule } from 'modules/auth/auth.module';

/**
 * En los ficheros "module" simplemente se importan los diferentes componentes
 * del módulo. También pueden exportarse componentes para que se usen en
 * otros módulos.
 */
@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
