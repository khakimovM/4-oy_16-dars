import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../core/database/prisma.service';

@Injectable()
export class BorrowsService {
  constructor(private readonly prisma: PrismaService) {}

  async createBorrow(bookId: number, userId: number) {
    const book = await this.prisma.book.findFirst({ where: { id: bookId } });
    if (!book) throw new NotFoundException('Book not found');

    if (book.available === 0)
      return { message: 'Ushbu kitobdan hozircha mavjud emas' };

    const borrow = await this.prisma.borrow.create({
      data: { bookId, userId },
      select: { id: true, userId: true, bookId: true, borrowDate: true },
    });

    await this.prisma.book.update({
      where: { id: book.id },
      data: { available: book.available - 1 },
    });

    return { message: 'book successfully borrowed', data: borrow };
  }

  async getAllBorrows() {
    return await this.prisma.borrow.findMany({
      select: {
        id: true,
        userId: true,
        bookId: true,
        borrowDate: true,
        returnDate: true,
      },
    });
  }

  async getMyBorrows(userId: number) {
    return await this.prisma.borrow.findMany({
      where: { userId },
      select: {
        id: true,
        userId: true,
        bookId: true,
        borrowDate: true,
        returnDate: true,
      },
    });
  }

  async returnBook(borrowId: number) {
    const borrow = await this.prisma.borrow.findFirst({
      where: { id: borrowId },
    });
    if (!borrow) throw new NotFoundException('Borrow not found');

    const data = await this.prisma.borrow.delete({
      where: { id: borrowId },
      select: {
        id: true,
        userId: true,
        bookId: true,
        borrowDate: true,
        returnDate: true,
      },
    });

    const book = await this.prisma.book.findFirst({
      where: { id: borrow.bookId },
    });

    await this.prisma.book.update({
      where: { id: borrow.userId },
      data: { available: book!.available + 1 },
    });

    return { message: 'Book successfully returned', data };
  }
}
