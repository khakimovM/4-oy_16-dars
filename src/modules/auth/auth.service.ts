import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async register(userData: RegisterDto) {
    const user = await this.userService.findByEmail(userData.email);
    if (user) throw new ConflictException('User already existed');
    const newUser = await this.userService.createUser(userData);
    const { password, ...result } = newUser;
    return { message: 'User successfull created', user: result };
  }
  async login(userData: { email: string; password: string }) {
    const user = await this.userService.findByEmail(userData.email);
    if (!user) throw new UnauthorizedException('email or password incorrect');

    const checkPassword = await bcrypt.compare(
      userData.password,
      user.password,
    );

    if (!checkPassword)
      throw new UnauthorizedException('email or password incorrect');

    const token = await this.jwtService.signAsync({ userId: user.id });
    return { token };
  }
  async getProfile(id: number) {
    const user = await this.userService.findById(id);
    if (!user) throw new NotFoundException('user not found');
    const { password, ...result } = user;
    return result;
  }
}
