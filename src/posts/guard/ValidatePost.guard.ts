import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { PostsService } from '@app/posts/posts.service';

@Injectable()
export class ValidatePost implements CanActivate {
  constructor(private postService: PostsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const postId = +request.params?.id;
      
    // add both service post and comment and also user
   
    const post = await this.postService.findOne({ id: postId });
   
    if (!post) {
      throw new NotFoundException(`Post not found`);
    }
    request.post = post;
    return true;
  }
}
