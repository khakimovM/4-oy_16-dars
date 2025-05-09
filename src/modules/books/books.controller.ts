import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { CreateBookDto } from './dto/create.book.dto';
import { UpdateBookDto } from './dto/update.book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  @SetMetadata('roles', ['ADMIN', 'MODERATOR'])
  async createBook(@Body() body: CreateBookDto) {
    return await this.booksService.createBook(body);
  }

  @Get()
  async getAllBooks() {
    return await this.booksService.getAllBooks();
  }

  @Get(':id')
  async getOneBook(@Param('id') id: string) {
    return await this.booksService.getOneBook(+id);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RoleGuard)
  @SetMetadata('roles', ['ADMIN', 'MODERATOR'])
  async updateBook(@Body() body: UpdateBookDto, @Param('id') id: string) {
    return await this.booksService.updateBook(+id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RoleGuard)
  @SetMetadata('roles', ['ADMIN'])
  async deleteBook(@Param('id') id: string) {
    return await this.booksService.deleteBook(+id);
  }
}
