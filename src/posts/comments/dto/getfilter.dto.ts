import { PostDto } from '@app/posts/dto/post.dto';

export class CommentGetFilterDto {
  id?: number;
  name?: string;
  email?: string;
  body?: string;
  post?: Partial<PostDto>;
}
