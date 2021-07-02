import {
  Controller,
  Get,
  Post,
  Req,
  HttpStatus,
  HttpCode,
  Query,
  Param,
  Body,
  UseFilters,
  HttpException, UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './create-cat.dto';
import { HttpExceptionFilter } from './book/common/filters/exception.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @UseFilters(HttpExceptionFilter)
  @Get(":id/test")
  findAll(): Observable<any[]> {
    throw  new HttpException("BAD_REQUEST" , HttpStatus.BAD_REQUEST)
  }


  @Post()
  //Default one for post request is 201 ----------> we can add custom one.
  @HttpCode(204)
  create(@Body() createCatDto : CreateCatDto): string {
    return 'This action adds a new cat';
  }

  // @Get(':id')
  // findOne(@Param() params): string {
  //   console.log(params.id);
  //   return `This action returns a #${params.id} cat`;
  // }

}
