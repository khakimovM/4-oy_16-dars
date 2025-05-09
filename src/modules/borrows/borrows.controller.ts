import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { BorrowsService } from './borrows.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateBorrowDto } from './dto/create.borrow.dto';
import { RoleGuard } from 'src/common/guards/role.guard';

@Controller('borrows')
export class BorrowsController {
  constructor(private readonly borrowService: BorrowsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async borrowBook(@Body() body: CreateBorrowDto, @Request() req: any) {
    const userId = req.userId;
    return await this.borrowService.createBorrow(body.bookId, userId);
  }

  @Get()
  @UseGuards(AuthGuard, RoleGuard)
  @SetMetadata('roles', ['ADMIN', 'MODERNATOR'])
  async getAllBorrows() {
    return this.borrowService.getAllBorrows();
  }

  @Get('my')
  @UseGuards(AuthGuard)
  async getMyBorrows(@Request() req: any) {
    const userId = req.userId;
    return this.borrowService.getMyBorrows(userId);
  }

  @Put(':id/return')
  @UseGuards(AuthGuard, RoleGuard)
  @SetMetadata('roles', ['ADMIN', 'MODERATOR', 'OWNER'])
  async returnBook(@Param('id') id: string) {
    return await this.borrowService.returnBook(+id);
  }
}
