// import { Injectable, NotFoundException, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { CommentsService } from '../comments.service';

// @Injectable()
// export class CommentBelongsToPost {
//   constructor(private readonly reflector: Reflector, private readonly commentsService: CommentsService) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const postId = +request.params.postId;
//     const id = +request.params.id;

//     const postComment = await this.commentsService.findOne({ id, post: { id: postId } });

//     if (!postComment) {
//       throw new NotFoundException('Comment not found');
//     }

//     return true;
//   }
// }
