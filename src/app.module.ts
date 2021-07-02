import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';

@Module({
  imports: [BookModule],
  controllers: [AppController],
  providers: [AppService],
  exports : [AppService]
})
export class AppModule {}
