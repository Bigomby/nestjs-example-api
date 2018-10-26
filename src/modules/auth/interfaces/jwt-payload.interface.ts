/**
 * Los Json Web Tokens son simplemente datos en formato JSON que han sido
 * firmados y luego codificados en base64.
 *
 * Cuando un usuario provee su usuario y contraseña, el servidor firma y
 * envía este token al usuario. El usuario usara el token en sucesivas
 * peticiones que requiera de autenticación.
 *
 * En este caso en concreto el JWT simplemente contiene el id de usuario. Lo
 * realmente importante es que el token se enviará firmado.
 */
export interface JwtPayload {
  readonly id: string;
}
