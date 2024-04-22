import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PostResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
        
      map((data) => {
        console.log('data',data)
        const { data: postData, message } = data;
        const messagesArray = Array.isArray(message) ? message : [message];
        // console.log('postdata',postData)
        return {
          data:postData,
          message:  messagesArray
        };
      }),
    );
  }
}
