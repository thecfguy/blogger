import { PostDto } from '@app/posts/dto/post.dto';

export class CommentDto {
  id: number;
  name: string;
  email: string;
  body: string;
  post: PostDto;
}
