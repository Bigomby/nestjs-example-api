import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;
}
