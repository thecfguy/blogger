import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { PostsService } from '@app/posts/posts.service';
import { CommentsService } from '../comments.service';

@Injectable()
export class ValidatePostAndComment implements CanActivate {
  constructor(
    private postService: PostsService,
    private commentService: CommentsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const postId = +request.params?.postId;
    const commentId = +request.params?.id;

    const post = await this.postService.findOne({ id: postId });

    if (!post) {
      throw new NotFoundException(`Post not found`);
    }

    const comment = await this.commentService.findOne({
      id: commentId,
      post: { id: postId },
    });

    if (!comment) {
      throw new NotFoundException(`Comment Not Found`);
    }
    request.post = post;
    request.comment = comment;

    return true;
  }
}
