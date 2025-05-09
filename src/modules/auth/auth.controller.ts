import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    try {
      return await this.authService.register(body);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return await this.authService.login(body);
  }

  @Get('profile/:id')
  @UseGuards(AuthGuard)
  // @SetMetadata('roles', ['admin', 'superadmin', 'owner'])
  async getProfile(@Request() req: any) {
    const id = req.userId;
    return await this.authService.getProfile(+id);
  }
}
