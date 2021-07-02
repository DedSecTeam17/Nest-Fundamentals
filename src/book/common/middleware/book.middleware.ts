import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';


export class BookMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): any {
    console.log('Request...');
    next();
  }

}


// This type of middleware is called functional middleware
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`);
  next();
};
