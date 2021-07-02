import { ArgumentMetadata, HttpException, HttpStatus, PipeTransform } from '@nestjs/common';
import { throwError } from 'rxjs';


export class BookValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    console.log(value);
    if (value == parseInt(value))
      return value;
    else
      throw new HttpException('Only Integer is allowed', HttpStatus.BAD_REQUEST);

  }

}
