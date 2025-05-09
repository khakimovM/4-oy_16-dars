import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../core/database/prisma.service';
import { CreateBookDto } from './dto/create.book.dto';
import { NotFoundError } from 'rxjs';
import { UpdateBookDto } from './dto/update.book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async createBook(bookData: CreateBookDto) {
    const book = await this.prisma.book.findFirst({
      where: { isbn: bookData.isbn },
    });
    if (book) throw new ConflictException('Books already existed');
    const newBook = await this.prisma.book.create({
      data: bookData,
      select: {
        id: true,
        title: true,
        author: true,
        isbn: true,
        quantity: true,
        available: true,
      },
    });
    return { message: 'book successfully added', book: newBook };
  }
  async getAllBooks() {
    return await this.prisma.book.findMany({
      select: {
        id: true,
        title: true,
        author: true,
        isbn: true,
        quantity: true,
        available: true,
      },
    });
  }

  async getOneBook(id: number) {
    const book = await this.prisma.book.findFirst({
      where: { id },
      select: {
        id: true,
        title: true,
        author: true,
        isbn: true,
        quantity: true,
        available: true,
      },
    });
    if (!book) throw new NotFoundException('Book not found');

    return book;
  }

  async updateBook(id: number, bookData: UpdateBookDto) {
    const book = await this.prisma.book.findFirst({ where: { id } });
    if (!book) throw new NotFoundException('Book not found');

    const updatedBook = await this.prisma.book.update({
      where: { id },
      data: bookData,
      select: {
        id: true,
        title: true,
        author: true,
        isbn: true,
        quantity: true,
        available: true,
      },
    });

    return { message: 'book successfully updated', book: updatedBook };
  }

  async deleteBook(id: number) {
    const book = await this.prisma.book.findFirst({ where: { id } });
    if (!book) throw new NotFoundException('Book not found');

    await this.prisma.book.delete({ where: { id } });

    return { message: 'Book successfully deleted' };
  }
}
