import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { AppService } from '../app.service';
import { BookMiddleware } from './common/middleware/book.middleware';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/exception.filter';
import { RoleGuard } from './common/guards/role-guard';

@Module({
  controllers: [BookController],
  providers: [BookService, AppService  , {
    provide: APP_GUARD,
    useClass: RoleGuard,
  }],
})
export class BookModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    // consumer.apply(BookMiddleware).forRoutes({path : "book" , method : RequestMethod.GET});
    consumer.apply(BookMiddleware).forRoutes(BookController);
    // consumer.apply(BookMiddleware).exclude(
    //   { path: 'book', method: RequestMethod.PUT },
    //   { path: 'book', method: RequestMethod.POST },
    //   "book/(.*)"
    // ).forRoutes(BookController);


  }


}
