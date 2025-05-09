import { IsEnum, IsString } from 'class-validator';
import { Role } from 'src/modules/auth/dto/register.dto';

export class ChangeRoleDto {
  @IsEnum(Role)
  @IsString()
  role: Role;
}
