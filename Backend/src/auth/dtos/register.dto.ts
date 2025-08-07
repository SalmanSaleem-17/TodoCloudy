import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from '../../common/constants/roles.enum';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  role?: Role = Role.USER;
}