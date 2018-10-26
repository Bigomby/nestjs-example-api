import {
  Controller,
  UseGuards,
  UseInterceptors,
  HttpException,
} from '@nestjs/common';
import { Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from 'modules/users/users.service';
import { IUser } from 'modules/users/interfaces/user.interface';
import { CreateUserDto } from 'modules/users/dtos/create-user.dto';
import { UpdateUserDto } from 'modules/users/dtos/update-user.dto';
import { RemovePasswordInterceptor } from 'modules/users/interceptors/remove-password.interceptor';

/**
 * UsersController contiene la lógica para manejar las peticiones recibidas
 * relacionadas con los usuarios.
 *
 * Los controladores no contienen la lógica de negocio, sino que
 * deben delegarla en los servicios, en este caso el servicio "users.service".
 *
 * @Controller es un decorador, se usa para indicarle a Nest.js que en este
 * controlador queremos manejar las rutas que llegan con url "/users".
 *
 * @UseInterceptors(RemovePasswordInterceptor) es otro decorador que se utiliza
 * para indicarle a Nest.js que queremos que se ejecute una acción DESPUÉS de
 * nuestra lógica. En este caso este decorador elimina el campo "password".
 * Como el decorador se aplica a la clase tendrá efecto para todos sus métodos.
 * Esto quiere decir que la API nunca devolverá el campo "password" porque el
 * interceptor lo eliminará antes de que llegue al usuario.
 */
@Controller('users')
@UseInterceptors(RemovePasswordInterceptor)
export class UsersController {
  /**
   * El constructor se utiliza para pedirle a Nest.js que "inyecte" algún
   * servicio, en este caso se inyecta UsersService y estará disponible en todos
   * los métodos a través de "this.usersService".
   */
  constructor(private readonly usersService: UsersService) {}

  /**
   * El primer argumento de este método lleva un decorador Body() que indica
   * a Nest.js que como primer argumento se debe recibir el cuerpo de la
   * petición.
   *
   * El cuerpo de la petición es de tipo CreateUserDto. Los dtos son clases
   * que describen la estructura de los datos que se reciben. En este caso,
   * CreateUserDto describe cómo es la petición que debe usarse para crear
   * un usuario. Para más información ver la clase CreateUserDto.
   */
  @Post()
  public async create(@Body() user: CreateUserDto): Promise<IUser> {
    try {
      return await this.usersService.create(user);
    } catch (e) {
      if (e.name === 'QueryFailedError') {
        throw new HttpException(e.detail, 422);
      }
    }
  }

  /**
   * Cuando se usa el decorador @Get(URL) en un método se indica que ese
   * método manejará las peticiones POST dirigidas a esa URL. En este caso no
   * se pasa ningún argumento a @Get(), por lo que este método atenderá las
   * peticiones GET a "/users".
   */
  @Get()
  public find(): Promise<IUser[]> {
    return this.usersService.find();
  }

  /**
   * En este método se usa el decorador @Param para indicar a Nest.js que como
   * primer argumento se debe recibir un parámetro de la URL, en este caso el
   * parámetro "id". Este parámetro se describe primero en el decorador
   * @Get(':id').
   *
   * Ejemplo:
   *
   * Si la petición va a la url "/users/12345", el primer argumento
   * de esta función ("id") será "12345".
   */
  @Get(':id')
  public findById(@Param('id') id: string): Promise<IUser> {
    return this.usersService.findById(id);
  }

  /**
   * @UseGuards(AuthGuard()) es un decorador que se usa para indicarle a Nest.js
   * que se quiere usar el Guard "AuthGuard". Este Guard se encarga de que el método
   * sólo pueda ser ejecutado cuando se cumpla una condición, en este caso que el
   * usuario envíe un token de sesión en las cabeceras de la petición.
   */
  @Put(':id')
  @UseGuards(AuthGuard())
  public update(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<IUser> {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  public delete(@Param('id') id: string): Promise<void> {
    return this.usersService.delete(id);
  }
}
