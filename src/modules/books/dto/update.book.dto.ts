import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  author: string;

  @IsOptional()
  @IsNumber()
  quantity: number;
}
