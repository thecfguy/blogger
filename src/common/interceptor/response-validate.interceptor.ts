import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ResponseValidationInterceptor<T> implements NestInterceptor {
  constructor(private readonly dtoClass: new (...args: any[]) => T) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(async (data) => {
        if (Array.isArray(data)) {
          const transformedData =data?.map((item)=> plainToClass(this.dtoClass,item))
          const errors = await validate(transformedData);

        if (errors.length > 0) {
          throw new InternalServerErrorException({
            message: 'Response validation failed',
            errors,
          });
        }
        return transformedData;
        } else {
          return plainToClass(this.dtoClass, data);
        }
      }),
    );
  }
}
