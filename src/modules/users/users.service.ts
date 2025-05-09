import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../core/database/prisma.service';
import * as bcrypt from 'bcrypt';
import { ChangeRoleDto } from './dto/change.role.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async findByEmail(email: string) {
    return await this.prisma.user.findFirst({ where: { email } });
  }
  async createUser(userData: any) {
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    return await this.prisma.user.create({
      data: { ...userData, password: hashedPassword },
    });
  }
  async findById(id: number) {
    return await this.prisma.user.findFirst({
      where: { id },
    });
  }
  async getAllUsers() {
    return await this.prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true },
    });
  }

  async getOneUser(id: number) {
    const user = await this.prisma.user.findFirst({
      where: { id },
      select: { id: true, email: true, name: true, role: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async changeUserRole(id: number, userData: ChangeRoleDto) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    const changedUser = await this.prisma.user.update({
      where: { id },
      data: userData,
      select: { id: true, email: true, name: true, role: true },
    });
    return changedUser;
  }

  async deleteUser(id: number) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    await this.prisma.user.delete({ where: { id } });
    return { message: 'user successfully deleted' };
  }
}
