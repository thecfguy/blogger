import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { PostsService } from '@app/posts/posts.service';
import { CommentsService } from '../comments.service';
import { UsersService } from '@app/users/users.service';

@Injectable()
export class ValidatePostAndComment implements CanActivate {
  constructor(
    private postService: PostsService,
    private commentService: CommentsService,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // get the user id from the user from request
    const userId = +request.user?.id;
   
    const postId = +request.params?.postId;
    const id = +request.params?.id;
    // add both service post and comment and also user 
    const User = await this.userService.findOne(userId);
    const post = await this.postService.findOne({ id: postId });

    if (!post) {
      throw new NotFoundException(`Post not found`);
    }
    // first check if the post not found then give error

    // check user have any post or not using the post and user id 
    if (User?.id !== post.user?.id) {
      throw new NotFoundException(`User does not own the post`);
    }

    // if user have any post then check comment is belong to post or not 
    const comment = await this.commentService.findOne({
      filter: { id: id, post: { id: postId } },
    });

    if (!comment) {
      throw new NotFoundException(`Comment Not Found`);
    }
    // all condtion fulfilled then return true all data varify 
    return true;
  }
}
