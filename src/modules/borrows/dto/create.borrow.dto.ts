import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class CreateBorrowDto {
  @IsNumber()
  bookId: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  returnDate: Date;
}
