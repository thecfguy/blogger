// import {
//   Injectable,
//   NestInterceptor,
//   ExecutionContext,
//   CallHandler,
// } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { plainToClass } from 'class-transformer';
// import { CommentDto } from '../dto/comment.dto';

// @Injectable()
// export class CommentResponseInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     return next.handle().pipe(
//       map((data) => {
//         if (Array.isArray(data)) {
//          return  data.map((item) => plainToClass(CommentDto, item));
         
//         } else {
//           console.log('before', data);
//           return  plainToClass(CommentDto, data);
         
//         }
//       }),
//     );
//   }
// }
