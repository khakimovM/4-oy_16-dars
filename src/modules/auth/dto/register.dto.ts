import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export enum Role {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  USER = 'USER',
}

export class RegisterDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsString()
  name: string;

  @IsEnum(Role)
  @IsOptional()
  role: string;
}
