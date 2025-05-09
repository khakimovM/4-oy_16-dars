import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { ChangeRoleDto } from './dto/change.role.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard, RoleGuard)
  @SetMetadata('roles', ['ADMIN'])
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get('/:id')
  @UseGuards(AuthGuard, RoleGuard)
  @SetMetadata('roles', ['ADMIN', 'OWNER'])
  async getOneUser(@Param('id') id: string) {
    return await this.userService.getOneUser(+id);
  }

  @Put('/:id/role')
  @UseGuards(AuthGuard, RoleGuard)
  @SetMetadata('roles', ['ADMIN'])
  async changeUserRole(@Param('id') id: string, @Body() body: ChangeRoleDto) {
    return await this.userService.changeUserRole(+id, body);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard, RoleGuard)
  @SetMetadata('roles', ['ADMIN'])
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(+id);
  }
}
