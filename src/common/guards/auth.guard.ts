import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'].split(' ')[1];
    try {
      let { userId } = await this.jwtService.verifyAsync(token);
      request.userId = userId;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Siz tizimga qayta kirishingiz kerak');
    }
  }
}
