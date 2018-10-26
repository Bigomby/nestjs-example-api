import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IUser } from 'modules/users/interfaces/user.interface';

const removePassword = (element: any) => {
  if (!element.password) {
    return element;
  }

  const { password, ...rest } = element;
  return rest;
};

/**
 * Los interceptors se encarga de ejecutar lógica antes o después de las
 * peticiones. En este caso se ejecuta una función justo antes de enviar la
 * respuesta al usuario. En la función se elminia el campo "password", para
 * aseguranos de que este campo nunca se envía (por motivos de seguridad).
 */
@Injectable()
export class RemovePasswordInterceptor implements NestInterceptor {
  public async intercept(_context: ExecutionContext, call$: Observable<any>) {
    return call$.pipe(
      map(
        (user: IUser | IUser[]) =>
          Array.isArray(user) ? user.map(removePassword) : removePassword(user),
      ),
    );
  }
}
