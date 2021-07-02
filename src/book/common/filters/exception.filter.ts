import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
@Injectable()
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // response
    //   .status(status)
    //   .json({
    //     statusCode: status,
    //     message : exception.getResponse(),
    //     timestamp: new Date().toISOString(),
    //     path: request.url,
    //   });
    response
      .status(status)
      .json(exception.getResponse());
  }
}
