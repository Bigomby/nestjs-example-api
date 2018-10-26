import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Las entidades son objetos de TypeORM que nos permiten declarar la estructura
 * de nuestros datos en la BBDD.
 *
 * En este caso se indica que la tabla "user" contendrá las columnas que se
 * describen a continuación. Se pueden introducir algunas restricciones, en este
 * caso se pide que el campo "email" debe ser único en la tabla.
 *
 * También cabe destacar que el campo ID lo generará automáticamente la BBDD y
 * tendrá un formato UUID.
 *
 * Más info: http://typeorm.io/#/entities
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
