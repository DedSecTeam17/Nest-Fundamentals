import { IsNumber, IsString } from 'class-validator';

export class CreateBookDto {


  @IsString()
  author: String;
  @IsNumber()
  price: String;
  @IsString()
  title: String;
  @IsString()
  description: String;
}
