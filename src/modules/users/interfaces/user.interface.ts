/**
 * La interfaz de usuario se usa en nuestros componentes para que TypeScript
 * pueda realizar comprobaciones en tiempo de compilación.
 */
export interface IUser {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
}
