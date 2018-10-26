import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

/**
 * Los dtos nos permiten validar nuestros datos fácilmente. Un dto contiene la
 * estructura de una petición que se recibe en un controlador y deberían ser
 * usado sólo en los controladores.
 *
 * En este caso, tenemos un dto que describe cómo es la petición que debe
 * usarse para crear un nuevo usuario. Gracias al paquete "class-validator",
 * podemos añadir información sobra la validación con decoradores.
 *
 * Si no se cumple una de las imposiciones, la petición fallará y Nest.js se
 * encargará de informar qué ha fallado en la validación.
 */
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
