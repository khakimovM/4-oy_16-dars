import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './modules/core/core.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { BooksModule } from './modules/books/books.module';
import { BorrowsModule } from './modules/borrows/borrows.module';

@Module({
  imports: [CoreModule, UsersModule, AuthModule, BooksModule, BorrowsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
