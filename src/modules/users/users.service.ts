import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { promisify } from 'util';

import { User } from 'modules/users/entities/user.entity';
import { IUser } from 'modules/users/interfaces/user.interface';

const hashPasswordAsync = promisify(bcrypt.hash);
const comparePasswordAsync = promisify(bcrypt.compare);

/**
 * Los servicios son el lugar donde debe colocarse la lógica de negocio. En
 * este servicio se encuentra la lógica relacionada con el modelo "user".
 *
 * Se marcan como @Injectable para que puedan ser inyectados a través de los
 * constructores (como en el controlador de usuarios).
 */
@Injectable()
export class UsersService {
  /**
   * En este constructor se inyecta el repositorio de usuarios. Los repositorios
   * corresponden con las tablas de la base de datos. Son provistos por TypeORM.
   *
   * Con los repositorios pdemos hacer cosas como:
   *
   *   - this.users.find()
   *   - this.users.findById()
   *   - this.users.update()
   *   - this.users.delete()
   *
   * Y muchas más cosas: http://typeorm.io/#/repository-api
   */
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  /**
   * Aquí se crea un nuevo usuario. Para ello se usa la entidad usuario. Basta
   * con crear una nueva instancia, rellenar los datos y luego usar el
   * repositorio de TypeORM para almacenarlo en la BBDD.
   *
   * NOTE: Es importante no almacenar la contraseña en claro en la BBDD, en
   * este caso se utiliza el módulo bcrypt para almacenar un hash de la
   * contraseña.
   */
  public async create({ name, email, password }: IUser): Promise<User> {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = await hashPasswordAsync(password, 10);

    await this.users.save(user);

    return user;
  }

  public async find(filter?: object): Promise<User[]> {
    return await this.users.find(filter);
  }

  public async findById(id: string): Promise<User> {
    return await this.users.findOne(id);
  }

  public async update(id: string, user: IUser): Promise<IUser> {
    await this.users.update(id, user);

    return await this.users.findOne(id);
  }

  public async delete(id: string): Promise<void> {
    await this.users.delete(id);

    return;
  }
}
