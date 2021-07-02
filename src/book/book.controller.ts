import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseFilters, ParseIntPipe, UsePipes, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AppService } from '../app.service';
import { HttpExceptionFilter } from './common/filters/exception.filter';
import { BookValidationPipe } from './common/pipes/book.pipe';
import { AppSchemaValidation } from './common/pipes/schema_validation.pipe';
import { ClassTransformerValidationPipe } from './common/pipes/class_transformer_validation.pipe';
import { RoleGuard } from './common/guards/role-guard';
import { Roles } from './common/decorators/role-decorator';
import { RolesType } from './common/roles-type';
import { LoggingInterceptor } from './common/Interceptors/logging-interceptor';
import { User } from './common/decorators/user-decorator';

@UseInterceptors(LoggingInterceptor)
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService, private readonly  appService: AppService) {
  }


  @Post()
  // @UsePipes(new AppSchemaValidation())
  create(@Body(new ClassTransformerValidationPipe()) createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  @UseFilters(HttpExceptionFilter)
  findAll() {
    // return this.bookService.findAll();
    throw  new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Get(':id')
  findOne(@Param('id', BookValidationPipe) id: string) {
    console.log(id);
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {

    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }

  @Get(':id/color')
  // @UseGuards(RoleGuard)
  @Roles(RolesType.admin)
  getConfiguration(@Param('id') id: string, @User('firstName') firstName: string) {
    console.log(firstName);
    return this.appService.getConfiguration();
  }

}
