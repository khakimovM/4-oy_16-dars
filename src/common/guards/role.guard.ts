import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/modules/core/database/prisma.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflect: Reflector,
    private readonly prisma: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request['userId'];
    const paramId = request.params.id;
    const user = await this.prisma.user.findFirst({ where: { id: userId } });
    if (!user) return false;
    const handler = context.getHandler();
    const roles = this.reflect.get('roles', handler);
    if (roles.includes(user.role)) {
      return true;
    } else if (roles.includes('OWNER') && userId == paramId) {
      return true;
    } else {
      return false;
    }
  }
}
